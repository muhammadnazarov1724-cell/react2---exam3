import { create } from 'zustand'

type User = {
  id: string
  name: string
  email: string
  created_at?: string
}

type UserState = {
  user: User | null
  setUser: (user: User | null) => void
}

function getSavedUser(): User | null {
  try {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  } catch {
    return null
  }
}

export const useUserStore = create<UserState>()((set) => ({
  user: getSavedUser(),

  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }

    set({ user })
  },
}))
