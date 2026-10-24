import { create } from 'zustand'
import { axiosRequest } from '../utils/token'
import { useUserStore } from './useUserStore'
// Архив: отдельное Zustand-хранилище, которое сохраняет копии долгов в браузере.
import { useArchiveStore } from './useArchiveStore'

type DebtSummary = {
  they_owe_me: number
  i_owe_them: number
}

type DebtState = {
  summary: DebtSummary
  getSummary: () => Promise<void>
  getDebts: () => Promise<void>
  debts: Debt[]
  // Обновляет долг в текущем списке и передаёт его копию в архив.
  rememberDebt: (debt: Debt) => void
  deleteDebt: (id: string) => Promise<void>
  updateDebt: (id: string, data: UpdateDebtData) => Promise<void>
  closeDebt: (id: string) => Promise<void>
}

// Этот тип также использует useArchiveStore: архивная копия содержит поля долга.
export type Debt = {
  id: string
  // Архив: ID владельца позволяет хранить копии разных аккаунтов отдельно.
  user_id: string
  contact_id: string
  amount: number
  currency: string
  direction: 'they_owe_me' | 'i_owe_them'
  status: 'pending' | 'partial' | 'paid'
  created_at: string
  due_date: string | null
  contact_name?: string
  description?: string | null
}

type UpdateDebtData = {
  name: string
  amount: number
  direction: 'they_owe_me' | 'i_owe_them'
  description: string
  due_date?: string
  contact_id?: string
}



const emptySummary = { they_owe_me: 0, i_owe_them: 0 }
let latestRequest = 0
// Защита списка и архива от старых ответов, пришедших после изменения долга.
let latestDebtRequest = 0
// Меняется при выходе или смене аккаунта, чтобы не принять ответ чужой сессии.
let debtSession = 0

// Архив: сохраняем копии полученных долгов через отдельное хранилище.
function archiveDebtCopies(debts: Debt[]) {
  if (!debts.length) return
  try {
    // getState() даёт доступ к saveDebts вне компонента React.
    // user_id указывает, в архив какого аккаунта записать эти долги.
    useArchiveStore.getState().saveDebts(debts[0].user_id, debts)
  } catch (error) {
    // При ошибке архива полученные с сервера долги остаются в текущем списке.
    console.error('Не удалось сохранить копии долгов в архиве:', error)
  }
}

export const useDebtStore = create<DebtState>()((set, get) => ({
    summary: emptySummary,

  debts: [],

  // После создания, редактирования или закрытия обновляем список и архив вместе.
  rememberDebt: (debt) => {
    const userId = useUserStore.getState().user?.id
    if (userId && userId !== debt.user_id) return

    latestDebtRequest++
    set((state) => ({
      debts: state.debts.some((item) => item.id === debt.id)
        ? state.debts.map((item) => item.id === debt.id ? { ...item, ...debt } : item)
        : [debt, ...state.debts],
    }))
    // Архив: сохраняем новую копию или обновляем существующую по ID долга.
    archiveDebtCopies([debt])
  },

  updateDebt: async (id, data) => {
    const session = debtSession
    const { name, ...changes } = data
    const currentDebt = get().debts.find((debt) => debt.id === id)
    let contactId = changes.contact_id ?? currentDebt?.contact_id
    let contactName = name.trim()

    // Имя хранится в контакте: для выбранного долга находим или создаём контакт.
    if (contactName !== currentDebt?.contact_name) {
      type Contact = { id: string; name: string }
      const { data: contacts } = await axiosRequest.get<Contact[]>('/contacts')
      let contact = contacts.find(
        (item) => item.name.trim().toLowerCase() === contactName.toLowerCase(),
      )

      if (!contact) {
        const { data: createdContact } = await axiosRequest.post<Contact>('/contacts', {
          name: contactName,
        })
        contact = createdContact
      }

      contactId = contact.id
      contactName = contact.name
    }

    const { data: updatedDebt } = await axiosRequest.patch<Debt>(`/debts/${id}`, {
      ...changes,
      contact_id: contactId,
    })

    if (session !== debtSession) return
    // Архив: rememberDebt сохранит изменённые имя, сумму и остальные поля.
    get().rememberDebt({ ...currentDebt, ...updatedDebt, contact_name: contactName })
    await get().getSummary()
  },

  closeDebt: async (id) => {
    const session = debtSession
    const currentDebt = get().debts.find((debt) => debt.id === id)
    const { data: updatedDebt } = await axiosRequest.patch<Debt>(`/debts/${id}`, {
      status: 'paid',
    })

    if (session !== debtSession) return
    // Архив: в копии тоже появится статус paid — долг закрыт.
    get().rememberDebt({ ...currentDebt, ...updatedDebt })
    await get().getSummary()
  },

  deleteDebt: async (id) => {
    const session = debtSession
    let debt = get().debts.find((item) => item.id === id)

    // Архив: если долга нет в памяти, получаем его вместе с именем для копии.
    if (!debt) {
      const { data } = await axiosRequest.get<Debt>(`/debts/${id}`)
      const { data: contact } = await axiosRequest.get<{ name: string }>(`/contacts/${data.contact_id}`)
      debt = { ...data, contact_name: contact.name }
    }

    const userId = useUserStore.getState().user?.id
    if (session !== debtSession || (userId && userId !== debt.user_id)) {
      throw new Error('Account changed before deleting the debt')
    }

    // Архив: сначала записываем копию в браузер, затем удаляем долг с сервера.
    // Здесь вызываем saveDebts напрямую: ошибка записи остановит DELETE.
    useArchiveStore.getState().saveDebts(debt.user_id, [debt])
    latestDebtRequest++
    await axiosRequest.delete(`/debts/${id}`)

    if (session !== debtSession) return
    latestDebtRequest++
    // Удаляем запись только из списка «Долги». Сохранённая копия в архиве остаётся.
    set((state) => ({ debts: state.debts.filter((item) => item.id !== id) }))
    await get().getSummary()
  },

  getDebts: async () => {
    const request = ++latestDebtRequest
    const session = debtSession
    try {
      const [{ data: debts }, { data: contacts }] = await Promise.all([
        axiosRequest.get<Debt[]>('/debts'),
        axiosRequest.get<{ id: string; name: string }[]>('/contacts'),
      ])

      if (request !== latestDebtRequest || session !== debtSession) return
      const userId = useUserStore.getState().user?.id
      if (userId && debts.some((debt) => debt.user_id !== userId)) return

      const debtsWithNames = debts.map((debt: Debt) => {
        const contact = contacts.find(
          (item: { id: string; name: string}) =>
            item.id === debt.contact_id
        )
        return {
          ...debt,
          contact_name: contact?.name,
        }
      })

      set({debts: debtsWithNames})
      // Архив: при загрузке списка сохраняем копии всех полученных долгов с именами.
      archiveDebtCopies(debtsWithNames)
    } catch (error) {
      console.log('Не удалось загрузить долги:', error);
    }
  },

  getSummary: async () => {
    const request = ++latestRequest

    try {
      const { data } = await axiosRequest.get('/dashboard/summary')
      if (request === latestRequest) set({ summary: data.outstanding })
    } catch (error) {
      if (request === latestRequest) {
        console.error('Не удалось загрузить суммы:', error)
      }
    }
  },
}))

// Архив остаётся в браузере; при смене аккаунта очищаем только текущие данные.
// Копии в useArchiveStore сохраняются для следующего входа владельца.
useUserStore.subscribe((state, previous) => {
  if (previous.user && previous.user.id !== state.user?.id) {
    latestRequest++
    latestDebtRequest++
    debtSession++
    useDebtStore.setState({ summary: emptySummary, debts: [] })
  }
})
