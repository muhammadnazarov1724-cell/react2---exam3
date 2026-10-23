import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import AddDebtButton from '../../components/AddDebtButton'

export default function Papki() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-[24px] font-semibold tracking-tight">{t('sidebar.folders')}</h1>
            <button
              type="button"
              disabled
              className="flex min-h-9 w-full cursor-not-allowed items-center justify-center gap-2 rounded-[8px] bg-[#477eff] px-4 py-2 text-[13px] font-medium text-white shadow-[0_3px_8px_#477eff18] transition-[background-color,box-shadow] duration-200 hover:bg-[#386ff0] hover:shadow-[0_5px_14px_#477eff25] motion-reduce:transition-none sm:w-auto"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              {t('foldersPage.add')}
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="dashboard-chart group min-w-0 rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] p-4 shadow-[0_2px_4px_#172b4d03] transition-[translate,border-color,background-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[var(--border)] hover:shadow-[0_10px_28px_#477eff10] motion-reduce:translate-y-0 motion-reduce:transition-none sm:p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[var(--surface)] text-[#477eff] transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M2 7a3 3 0 0 1 3-3h4l3 3h7a3 3 0 0 1 3 3H2V7Z" fill="currentColor" opacity="0.65" />
                    <path d="M2 11h20v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-6Z" fill="currentColor" />
                  </svg>
                </span>
                <h2 className="min-w-0 flex-1 text-[15px] leading-5 font-semibold">{t('foldersPage.unfiled')}</h2>
              </div>

              <div className="mt-4 space-y-3 text-[12px]">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="text-[var(--text-muted)]">{t('dashboardStats.net')}</p>
                  <p className="whitespace-nowrap tabular-nums"><span className="text-[13px] font-semibold">0</span> <span className="text-[11px] text-[var(--text-muted)]">TJS</span></p>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="text-[var(--text-muted)]">{t('dashboardStats.owedToMe')}</p>
                  <p className="whitespace-nowrap tabular-nums"><span className="text-[13px] font-semibold text-[#2aaf87]">0</span> <span className="text-[11px] text-[var(--text-muted)]">TJS</span></p>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="text-[var(--text-muted)]">{t('dashboardStats.iOwe')}</p>
                  <p className="whitespace-nowrap tabular-nums"><span className="text-[13px] font-semibold text-[#ed252a]">0</span> <span className="text-[11px] text-[var(--text-muted)]">TJS</span></p>
                </div>
              </div>

              <div className="mt-3 flex justify-end">
                <button type="button" disabled aria-label={t('foldersPage.open')} className="flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-full text-[var(--text-muted)]">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <p className="mt-5 text-[13px] leading-6 text-[var(--text-muted)]">{t('foldersPage.empty')}</p>
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
