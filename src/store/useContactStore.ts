import { create } from 'zustand'
import { axiosRequest } from '../utils/token'
import { useDebtStore, type Debt } from './useDebtStore'
import { useArchiveStore } from './useArchiveStore'
import { useUserStore } from './useUserStore'

export type Contact = {
  id: string
  user_id: string
  name: string
  phone: string | null
  note: string | null
}

export type ContactFormData = {
  name: string
  phone: string
  note: string
}

type ContactState = {
  contacts: Contact[]
  balances: Record<string, Record<string, number>>
  isLoading: boolean
  error: boolean
  getContacts: () => Promise<void>
  saveContact: (id: string | null, data: ContactFormData) => Promise<void>
  deleteContact: (id: string) => Promise<void>
}

let latestRequest = 0
let contactSession = 0

export const useContactStore = create<ContactState>()((set, get) => ({
  contacts: [],
  balances: {},
  isLoading: false,
  error: false,

  // Получаем людей, уже сохранённых при добавлении долгов.
  getContacts: async () => {
    const userId = useUserStore.getState().user?.id
    if (!userId) return
    const request = ++latestRequest
    set({ isLoading: true, error: false })

    try {
      const [{ data: contacts }, { data: debts }] = await Promise.all([
        axiosRequest.get<Contact[]>('/contacts'),
        axiosRequest.get<Debt[]>('/debts'),
      ])
      if (request !== latestRequest || useUserStore.getState().user?.id !== userId) return
      const ownContacts = contacts.filter((contact) => contact.user_id === userId)
      const contactIds = new Set(ownContacts.map((contact) => contact.id))
      const ownDebts = debts.filter((debt) => debt.user_id === userId && contactIds.has(debt.contact_id))

      // Остаток долга = первоначальная сумма минус платежи.
      // Считаем в сотых долях валюты, чтобы избежать ошибок округления.
      const remainingDebts = await Promise.all(
        ownDebts.filter((debt) => debt.status !== 'paid').map(async (debt) => {
          const { data: payments } = await axiosRequest.get<{ amount: number }[]>(`/debts/${debt.id}/payments`)
          const paid = payments.reduce((sum, payment) => sum + Math.round(Number(payment.amount) * 100), 0)
          const remaining = Math.max(0, Math.round(Number(debt.amount) * 100) - paid)
          return { ...debt, remaining }
        }),
      )

      // Старый ответ не должен заменять данные после нового запроса или выхода.
      if (request !== latestRequest || useUserStore.getState().user?.id !== userId) return

      const balances: ContactState['balances'] = {}
      for (const debt of ownDebts) {
        const contactBalance = balances[debt.contact_id] ??= {}
        contactBalance[debt.currency] = 0
      }
      for (const debt of remainingDebts) {
        const contactBalance = balances[debt.contact_id] ??= {}
        const sign = debt.direction === 'they_owe_me' ? 1 : -1
        contactBalance[debt.currency] = (contactBalance[debt.currency] ?? 0) + sign * debt.remaining
      }
      for (const contactBalance of Object.values(balances)) {
        for (const currency of Object.keys(contactBalance)) contactBalance[currency] /= 100
      }

      set({ contacts: ownContacts, balances, isLoading: false })
    } catch (error) {
      if (request !== latestRequest) return
      console.error('Не удалось загрузить контакты:', error)
      set({ error: true, isLoading: false })
    }
  },

  // Без ID создаём контакт; с ID редактируем существующего человека.
  saveContact: async (id, values) => {
    const session = contactSession
    if (!useUserStore.getState().user) throw new Error('Sign in to save a contact')
    const payload = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      note: values.note.trim(),
    }
    const { data: contact } = id
      ? await axiosRequest.patch<Contact>(`/contacts/${id}`, payload)
      : await axiosRequest.post<Contact>('/contacts', payload)

    if (session !== contactSession) throw new Error('Account changed while saving the contact')
    latestRequest++
    set((state) => ({
      contacts: state.contacts.some((item) => item.id === contact.id)
        ? state.contacts.map((item) => item.id === contact.id ? contact : item)
        : [contact, ...state.contacts],
      isLoading: false,
      error: false,
    }))
  },

  deleteContact: async (id) => {
    const session = contactSession
    const userId = useUserStore.getState().user?.id
    const contact = get().contacts.find((item) => item.id === id && item.user_id === userId)
    if (!userId || !contact) throw new Error('Contact does not belong to the current account')

    const { data: debts } = await axiosRequest.get<Debt[]>('/debts', { params: { contact_id: id } })
    if (session !== contactSession) throw new Error('Account changed before deleting the contact')

    // Архив: сохраняем связанные долги до удаления контакта с сервера.
    const copies = debts
      .filter((debt) => debt.user_id === userId && debt.contact_id === id)
      .map((debt) => ({ ...debt, contact_name: contact.name }))
    if (copies.length) useArchiveStore.getState().saveDebts(userId, copies)

    await axiosRequest.delete(`/contacts/${id}`)
    if (session !== contactSession) throw new Error('Account changed while deleting the contact')

    latestRequest++
    set((state) => {
      const balances = { ...state.balances }
      delete balances[id]
      return {
        contacts: state.contacts.filter((item) => item.id !== id),
        balances,
        isLoading: false,
      }
    })
    await Promise.all([
      useDebtStore.getState().getDebts(),
      useDebtStore.getState().getSummary(),
    ])
  },
}))

// При смене аккаунта очищаем контакты предыдущего пользователя.
useUserStore.subscribe((state, previous) => {
  if (state.user?.id !== previous.user?.id) {
    latestRequest++
    contactSession++
    useContactStore.setState({ contacts: [], balances: {}, isLoading: false, error: false })
  }
})
