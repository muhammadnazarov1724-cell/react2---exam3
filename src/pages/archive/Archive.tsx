import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import AddDebtButton from '../../components/AddDebtButton'
import { useArchiveStore } from '../../store/useArchiveStore'
import { useDebtStore } from '../../store/useDebtStore'
import { useUserStore } from '../../store/useUserStore'

export default function Archive() {
  const { t, i18n } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; userId: string } | null>(null)
  const [deleteError, setDeleteError] = useState(false)
  const deleteDialogRef = useRef<HTMLDialogElement>(null)
  const user = useUserStore((state) => state.user)
  const archivesByUser = useArchiveStore((state) => state.archivesByUser)
  const storageError = useArchiveStore((state) => state.storageError)
  const deleteArchivedDebt = useArchiveStore((state) => state.deleteArchivedDebt)
  const getDebts = useDebtStore((state) => state.getDebts)
  const archivedDebts = user ? archivesByUser[user.id]?.debts ?? [] : []
  const query = search.trim().toLocaleLowerCase()
  const filteredDebts = archivedDebts.filter((debt) => 
    (debt.contact_name ?? '').toLocaleLowerCase().includes(query))
  const locale = i18n.resolvedLanguage === 'tj' ? 'tg' : i18n.resolvedLanguage
  const rowStyle = 'grid min-w-[760px] grid-cols-[1.25fr_0.8fr_1fr_1.45fr_40px] items-center gap-3 px-5'

  useEffect(() => {
    if (user?.id) getDebts()
  }, [user?.id, getDebts])

  useEffect(() => {
    if (deleteTarget && deleteTarget.userId === user?.id) {
      deleteDialogRef.current?.showModal()
    } else {
      deleteDialogRef.current?.close()
    }
  }, [deleteTarget, user?.id])

  function dismissDeleteDialog() {
    deleteDialogRef.current?.close()
    setDeleteTarget(null)
    setDeleteError(false)
  }

  function handleDeleteCopy() {
    if (!user || !deleteTarget || deleteTarget.userId !== user.id) return
    try {
      deleteArchivedDebt(user.id, deleteTarget.id)
      dismissDeleteDialog()
    } catch (error) {
      console.error('Не удалось удалить копию из архива:', error)
      setDeleteError(true)
    }
  }

  function formatDate(value: string) {
    const date = new Date(value.length === 10 ? `${value}T00:00:00` : value)
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const fieldStyle = 'h-9 w-full rounded-[8px] border border-[var(--features-border)] bg-[var(--card-background)] text-[13px] text-[var(--text-muted)] outline-none transition-[border-color,box-shadow,background-color] duration-200 hover:border-[#aebed8] focus:border-[#477eff] focus:ring-2 focus:ring-[#477eff20] motion-reduce:transition-none'

  return (
    <div className="flex min-h-screen bg-[var(--background)] font-[Arial,sans-serif] text-[var(--text-primary)] transition-colors duration-200">
      <div
        id="dashboard-sidebar"
        inert={!sidebarOpen}
        className={`shrink-0 overflow-clip transition-[width] duration-300 ease-in-out motion-reduce:transition-none ${sidebarOpen ? 'w-[76px] sm:w-[252px]' : 'w-0'}`}
      >
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 px-5 pt-5 pb-12 sm:px-10 sm:pt-7">
          <h1 className="text-[24px] font-semibold tracking-tight">{t('sidebar.archive')}</h1>
          <p className="mt-2 max-w-[760px] text-[13px] leading-6 text-[var(--text-muted)]">
            {t('archivePage.storageNotice')}
          </p>
          {storageError && (
            <p role="alert" className="mt-3 rounded-lg border border-[#ed252a30] bg-[#ed252a08] px-4 py-3 text-[13px] text-[#ed252a]">
              {t('archivePage.storageFailed')}
            </p>
          )}

          <div className="dashboard-chart mt-5 min-w-0 rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] p-3.5 shadow-[0_2px_4px_#172b4d03] transition-[background-color,box-shadow] duration-300 hover:shadow-[0_8px_30px_#172b4d06] motion-reduce:transition-none">
            <div className="relative">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[var(--text-muted)]">
                <circle cx="10.5" cy="10.5" r="7.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('debtsPage.search')} aria-label={t('debtsPage.search')} className={`${fieldStyle} pr-4 pl-11`} />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className="relative w-full min-w-0 sm:w-auto sm:flex-1">
                <select aria-label={t('debtsPage.allContacts')} disabled className={`${fieldStyle} cursor-not-allowed appearance-none pr-9 pl-3`}>
                  <option>{t('debtsPage.allContacts')}</option>
                </select>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[var(--text-muted)]">
                  <path d="m4 6 4 4 4-4" fill="currentColor" />
                </svg>
              </div>
              <div className="relative w-full min-w-0 sm:w-auto sm:flex-1">
                <select aria-label={t('debtsPage.allFolders')} disabled className={`${fieldStyle} cursor-not-allowed appearance-none pr-9 pl-3`}>
                  <option>{t('debtsPage.allFolders')}</option>
                </select>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[var(--text-muted)]">
                  <path d="m4 6 4 4 4-4" fill="currentColor" />
                </svg>
              </div>
              <button type="button" disabled aria-label={t('debtsPage.sort')} title={t('debtsPage.sort')} className="ml-auto flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-[8px] border border-[var(--features-border)] text-[var(--text-muted)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 21V3m-4 4 4-4 4 4m6-4v18m-4-4 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div role="table" aria-label={t('sidebar.archive')} className="mt-3 overflow-x-auto">
              <div role="rowgroup">
                <div role="row" className={`${rowStyle} border-y border-[var(--features-border)] bg-[var(--background)] py-4 text-[11px] font-semibold tracking-[0.02em] text-[var(--text-muted)] uppercase`}>
                  <div role="columnheader" className="border-r border-[var(--features-border)]">{t('debtsPage.fullName')}</div>
                  <div role="columnheader" className="border-r border-[var(--features-border)]">{t('debtsPage.amount')}</div>
                  <div role="columnheader" className="border-r border-[var(--features-border)]">{t('archivePage.status')}</div>
                  <div role="columnheader" className="border-r border-[var(--features-border)]">{t('archivePage.description')}</div>
                  <div role="columnheader"><span className="sr-only">{t('debtsPage.actions')}</span></div>
                </div>
              </div>
              <div role="rowgroup">
                {filteredDebts.map((debt) => {
                  const incoming = debt.direction === 'they_owe_me'
                  const name = debt.contact_name || t('sidebar.user')
                  const closed = debt.status === 'paid'

                  return (
                    <div key={debt.id} role="row" className={`${rowStyle} min-h-[76px] border-b border-[var(--features-border)] py-3 text-[13px] last:border-b-0 hover:bg-[var(--background)]`}>
                      <div role="cell" className="min-w-0">
                        <p className="truncate font-semibold" title={name}>{name}</p>
                        <p className="mt-1 text-[11px] text-[var(--text-muted)]">{formatDate(debt.created_at)}</p>
                      </div>
                      <div role="cell" className="flex min-w-0 flex-wrap items-baseline gap-1 tabular-nums">
                        <span className={`font-semibold ${incoming ? 'text-[#2aaf87]' : 'text-[#ed252a]'}`}>
                          {incoming ? '+' : '-'}{Number(debt.amount).toLocaleString(locale, { maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)]">{debt.currency}</span>
                      </div>
                      <div role="cell">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${closed ? 'bg-[var(--surface)] text-[var(--text-muted)]' : 'bg-[#2aaf8715] text-[#2aaf87]'}`}>
                          {t(closed ? 'debtDetails.closed' : debt.status === 'partial' ? 'archivePage.partial' : 'debtDetails.active')}
                        </span>
                      </div>
                      <div role="cell" className="min-w-0 truncate text-[12px] text-[var(--text-muted)]" title={debt.description ?? ''}>
                        {debt.description || '—'}
                      </div>
                      <div role="cell" className="flex justify-center">
                        <button
                          type="button"
                          aria-label={t('archivePage.deleteFor', { name })}
                          title={t('debtsPage.delete')}
                          onClick={() => {
                            if (!user) return
                            setDeleteError(false)
                            setDeleteTarget({ id: debt.id, userId: user.id })
                          }}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[#ed252a10] hover:text-[#ed252a] focus-visible:outline-2 focus-visible:outline-[#ed252a]"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6m4-6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )
                })}
                {filteredDebts.length === 0 && (
                  <div role="row">
                    <div role="cell" aria-colspan={5} className="flex min-h-[180px] items-center justify-center px-4 py-10 text-center text-[14px] text-[var(--text-muted)]">
                      {t(query ? 'debtsPage.noResults' : 'archivePage.empty')}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 pb-28 text-[11px] text-[var(--text-muted)] sm:px-10">
          <p>{t('footer.copyright')}</p>
          <NavLink to="/" className="rounded py-1 transition-colors duration-200 hover:text-[#477eff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff]">{t('sidebar.home')}</NavLink>
        </div>
      </div>

      <dialog
        ref={deleteDialogRef}
        aria-labelledby="archive-delete-title"
        aria-describedby="archive-delete-message"
        onCancel={(event) => {
          event.preventDefault()
          dismissDeleteDialog()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dismissDeleteDialog()
        }}
        className="add-debt-dialog fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[440px] overflow-y-auto rounded-[14px] border border-[var(--features-border)] bg-[var(--card-background)] p-0 text-[var(--text-primary)] shadow-xl backdrop:bg-black/40"
      >
        <div className="p-6">
          <h2 id="archive-delete-title" className="text-[18px] font-semibold">{t('archivePage.deleteTitle')}</h2>
          <p id="archive-delete-message" className="mt-5 text-[14px] leading-6 text-[var(--text-muted)]">{t('archivePage.deleteMessage')}</p>
          {deleteError && <p role="alert" className="mt-4 text-[13px] text-[#ed252a]">{t('archivePage.storageFailed')}</p>}
          <div className="mt-7 flex justify-end gap-2">
            <button type="button" autoFocus onClick={dismissDeleteDialog} className="cursor-pointer rounded-lg px-4 py-2 text-[14px] text-[var(--text-muted)] hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-[#477eff]">
              {t('addDebtDialog.cancel')}
            </button>
            <button type="button" disabled={!user || deleteTarget?.userId !== user.id} onClick={handleDeleteCopy} className="cursor-pointer rounded-lg bg-[#ed252a] px-4 py-2 text-[14px] text-white hover:bg-[#d61f24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed252a] disabled:cursor-not-allowed disabled:opacity-60">
              {t('debtsPage.delete')}
            </button>
          </div>
        </div>
      </dialog>

      <AddDebtButton />
    </div>
  )
}
