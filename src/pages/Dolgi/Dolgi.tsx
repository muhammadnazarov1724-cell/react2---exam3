import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import DashboardStats from '../../components/DashboardStats'
import AddDebtButton from '../../components/AddDebtButton'

export default function Dolgi() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const fieldStyle = 'h-10 w-full rounded-[15px] border border-[var(--features-border)] bg-[var(--background)] text-[14px] text-[var(--text-muted)] outline-none transition-[border-color,box-shadow,background-color] duration-200 hover:border-[#aebed8] focus:border-[#477eff] focus:ring-2 focus:ring-[#477eff20] motion-reduce:transition-none'
  const iconButtonStyle = 'flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-[14px] border border-[var(--features-border)] bg-[var(--background)] text-[var(--text-muted)]'

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

        <div className="flex-1 px-5 pt-7 pb-12 sm:px-10 sm:pt-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-[24px] font-semibold tracking-tight">Adl 5:8</h1>

            <div className="flex flex-wrap items-center gap-2">
              <button type="button" disabled className="flex min-h-9 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[var(--features-border)] bg-[var(--card-background)] px-3.5 py-2 text-[13px] font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3v12m-4-4 4 4 4-4M5 14v4a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t('debtsPage.export')}
              </button>
              <button type="button" disabled className="flex min-h-9 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#477eff] px-4 py-2 text-[13px] font-medium text-white shadow-[0_3px_8px_#477eff18]">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="currentColor" />
                  <path d="M12 5v14m3-11h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9" stroke="#477eff" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                {t('debtsPage.quickPayment')}
              </button>
            </div>
          </div>

          <DashboardStats />

          <div className="mt-7 border-t border-[var(--features-border)] pt-4 sm:mt-8">
            <div className="dashboard-chart min-w-0 rounded-[22px] border border-[var(--features-border)] bg-[var(--card-background)] p-3.5 shadow-[0_2px_4px_#172b4d03] transition-[background-color,box-shadow] duration-300 hover:shadow-[0_8px_30px_#172b4d06] motion-reduce:transition-none">
              <div className="relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[var(--text-muted)]">
                  <circle cx="10.5" cy="10.5" r="7.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <input type="search" readOnly placeholder={t('debtsPage.search')} aria-label={t('debtsPage.search')} className={`${fieldStyle} pr-4 pl-11`} />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
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
                <div className="ml-auto flex gap-2">
                  <button type="button" disabled aria-label={t('debtsPage.filters')} title={t('debtsPage.filters')} className={iconButtonStyle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 6h18M6 12h12m-9 6h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button type="button" disabled aria-label={t('debtsPage.sort')} title={t('debtsPage.sort')} className={iconButtonStyle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M7 21V3m-4 4 4-4 4 4m6-4v18m-4-4 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              <div role="table" aria-label={t('sidebar.debts')} className="mt-3">
                <div className="overflow-x-auto">
                  <div role="row" className="grid min-w-[830px] grid-cols-[1.1fr_0.7fr_1.5fr_1.55fr_32px] items-center gap-3 border-y border-[var(--features-border)] bg-[var(--background)] px-5 py-4 text-[11px] font-medium text-[var(--text-muted)] uppercase">
                    <div role="columnheader" className="border-r border-[var(--features-border)]">{t('debtsPage.fullName')}</div>
                    <div role="columnheader" className="border-r border-[var(--features-border)]">{t('debtsPage.amount')}</div>
                    <div role="columnheader" className="border-r border-[var(--features-border)]">{t('debtsPage.progress')}</div>
                    <div role="columnheader" className="border-r border-[var(--features-border)]">{t('debtsPage.dueDate')}</div>
                    <div role="columnheader"><span className="sr-only">{t('debtsPage.actions')}</span></div>
                  </div>

                </div>
                <div role="row">
                  <div role="cell" aria-colspan={5} className="flex min-h-[180px] items-center justify-center px-4 py-10 text-center text-[14px] text-[var(--text-muted)]">
                    {t('debtsPage.empty')}
                  </div>
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
