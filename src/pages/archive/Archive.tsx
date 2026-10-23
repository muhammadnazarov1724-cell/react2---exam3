import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import AddDebtButton from '../../components/AddDebtButton'

export default function Archive() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

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

          <div className="dashboard-chart mt-5 min-w-0 rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] p-3.5 shadow-[0_2px_4px_#172b4d03] transition-[background-color,box-shadow] duration-300 hover:shadow-[0_8px_30px_#172b4d06] motion-reduce:transition-none">
            <div className="relative">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[var(--text-muted)]">
                <circle cx="10.5" cy="10.5" r="7.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input type="search" readOnly placeholder={t('debtsPage.search')} aria-label={t('debtsPage.search')} className={`${fieldStyle} pr-4 pl-11`} />
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

            <div role="table" aria-label={t('sidebar.archive')} className="mt-2">
              <div className="overflow-x-auto">
                <div role="row" className="grid min-w-[760px] grid-cols-[1.5fr_0.9fr_1.2fr_1.1fr_32px] items-center gap-3 border-y border-[var(--features-border)] bg-[var(--background)] px-5 py-4 text-[11px] font-semibold tracking-[0.02em] text-[var(--text-muted)] uppercase">
                  <div role="columnheader" className="border-r border-[var(--features-border)]">{t('debtsPage.fullName')}</div>
                  <div role="columnheader" className="border-r border-[var(--features-border)]">{t('debtsPage.amount')}</div>
                  <div role="columnheader" className="border-r border-[var(--features-border)]">{t('debtsPage.progress')}</div>
                  <div role="columnheader" className="border-r border-[var(--features-border)]">{t('archivePage.description')}</div>
                  <div role="columnheader"><span className="sr-only">{t('debtsPage.actions')}</span></div>
                </div>
              </div>
              <div role="row">
                <div role="cell" aria-colspan={5} className="flex min-h-[180px] items-center justify-center px-4 py-10 text-center text-[14px] text-[var(--text-muted)]">
                  {t('archivePage.empty')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 pb-28 text-[11px] text-[var(--text-muted)] sm:px-10">
          <p>{t('footer.copyright')}</p>
          <NavLink to="/" className="rounded py-1 transition-colors duration-200 hover:text-[#477eff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff]">{t('sidebar.home')}</NavLink>
        </div>
      </div>

      <AddDebtButton />
    </div>
  )
}
