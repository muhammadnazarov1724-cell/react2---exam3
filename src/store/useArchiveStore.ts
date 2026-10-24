import { create } from 'zustand'
import type { Debt } from './useDebtStore'

export type ArchivedDebt = Debt & { archived_at: string }

type UserArchive = {
  debts: ArchivedDebt[]
  removedIds: string[]
}

type Archives = Record<string, UserArchive>

type ArchiveState = {
  archivesByUser: Archives
  storageError: boolean
  saveDebts: (userId: string, debts: Debt[]) => void
  deleteArchivedDebt: (userId: string, debtId: string) => void
}

const storageKey = 'debtbook-archives-v1'

function readArchives(): { archives: Archives; loaded: boolean } {
  try {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return { archives: {}, loaded: true }

    const archives: Archives = JSON.parse(saved)
    if (!archives || typeof archives !== 'object' || Array.isArray(archives)) {
      throw new Error('Invalid archive')
    }
    for (const [userId, archive] of Object.entries(archives)) {
      if (
        !archive || !Array.isArray(archive.debts) || !Array.isArray(archive.removedIds) ||
        !archive.removedIds.every((id) => typeof id === 'string') ||
        !archive.debts.every((debt) => debt && typeof debt.id === 'string' && debt.user_id === userId)
      ) {
        throw new Error('Invalid archive entries')
      }
    }
    return { archives, loaded: true }
  } catch (error) {
    console.error('Не удалось прочитать архив:', error)
    return { archives: {}, loaded: false }
  }
}

export const useArchiveStore = create<ArchiveState>()((set) => {
  const saved = readArchives()

  function currentArchives() {
    const current = readArchives()
    if (!current.loaded) {
      set({ storageError: true })
      throw new Error('Archive could not be loaded')
    }
    return current.archives
  }

  function commit(archives: Archives) {
    try {
      // Сначала записываем копию в браузер, затем обновляем интерфейс.
      localStorage.setItem(storageKey, JSON.stringify(archives))
      set({ archivesByUser: archives, storageError: false })
    } catch (error) {
      set({ storageError: true })
      throw error
    }
  }

  return {
    archivesByUser: saved.archives,
    storageError: !saved.loaded,

    saveDebts: (userId, debts) => {
      if (!userId || debts.some((debt) => debt.user_id !== userId)) {
        throw new Error('Archive owner does not match the debt')
      }

      const archives = currentArchives()
      const archive = archives[userId] ?? { debts: [], removedIds: [] }
      const removedIds = new Set(archive.removedIds)
      const copies = new Map(archive.debts.map((debt) => [debt.id, debt]))

      for (const debt of debts) {
        // Удалённую вручную копию больше не добавляем при загрузке списка.
        if (removedIds.has(debt.id)) continue
        const previous = copies.get(debt.id)
        copies.set(debt.id, {
          ...previous,
          ...debt,
          archived_at: previous?.archived_at ?? new Date().toISOString(),
        })
      }

      commit({
        ...archives,
        [userId]: { debts: [...copies.values()], removedIds: archive.removedIds },
      })
    },

    deleteArchivedDebt: (userId, debtId) => {
      const archives = currentArchives()
      const archive = archives[userId]
      if (!archive) return

      commit({
        ...archives,
        [userId]: {
          debts: archive.debts.filter((debt) => debt.id !== debtId),
          removedIds: [...new Set([...archive.removedIds, debtId])],
        },
      })
    },
  }
})

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key !== storageKey && event.key !== null) return
    const saved = readArchives()
    useArchiveStore.setState({ archivesByUser: saved.archives, storageError: !saved.loaded })
  })
}
