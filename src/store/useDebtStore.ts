import { create } from 'zustand'
import { axiosRequest } from '../utils/token'
import { useUserStore } from './useUserStore'

type DebtSummary = {
  they_owe_me: number
  i_owe_them: number
}

type DebtState = {
  summary: DebtSummary
  getSummary: () => Promise<void>
}

const emptySummary = { they_owe_me: 0, i_owe_them: 0 }
let latestRequest = 0

export const useDebtStore = create<DebtState>()((set) => ({
  summary: emptySummary,

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

// При выходе очищаем суммы и не принимаем старые ответы сервера.
useUserStore.subscribe((state, previous) => {
  if (previous.user && previous.user.id !== state.user?.id) {
    latestRequest++
    useDebtStore.setState({ summary: emptySummary })
  }
})
