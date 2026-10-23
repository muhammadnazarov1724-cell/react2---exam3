import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import AddDebtButton from '../../components/AddDebtButton'

export default function Contact() {
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
            <h1 className="text-[24px] font-semibold tracking-tight">{t('sidebar.contacts')}</h1>
            <button
              type="button"
              disabled
              className="flex min-h-9 w-full cursor-not-allowed items-center justify-center gap-2 rounded-[8px] bg-[#477eff] px-4 py-2 text-[13px] font-medium text-white shadow-[0_3px_8px_#477eff18] transition-[background-color,box-shadow] duration-200 hover:bg-[#386ff0] hover:shadow-[0_5px_14px_#477eff25] motion-reduce:transition-none sm:w-auto"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              {t('contactPage.add')}
            </button>
          </div>

          <div className="dashboard-chart mt-5 min-w-0 overflow-hidden rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] shadow-[0_2px_4px_#172b4d03] transition-[background-color,box-shadow] duration-300 hover:shadow-[0_8px_30px_#172b4d06] motion-reduce:transition-none">
            <div className="p-3.5">
              <input
                type="search"
                readOnly
                placeholder={t('contactPage.search')}
                aria-label={t('contactPage.search')}
                className="h-11 w-full rounded-[8px] border border-[var(--features-border)] bg-[var(--card-background)] px-3.5 text-[13px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] transition-[border-color,box-shadow,background-color] duration-200 hover:border-[#aebed8] focus:border-[#477eff] focus:ring-2 focus:ring-[#477eff20] motion-reduce:transition-none"
              />
            </div>

            <div role="table" aria-label={t('sidebar.contacts')}>
              <div className="overflow-x-auto">
                <div role="row" className="grid min-w-[760px] grid-cols-[1.3fr_0.9fr_1.2fr_0.9fr_0.9fr] items-center gap-3 border-y border-[var(--features-border)] bg-[var(--background)] px-5 py-4 text-[11px] font-semibold uppercase">
                  <div role="columnheader" className="border-r border-[var(--features-border)]">{t('debtsPage.fullName')}</div>
                  <div role="columnheader" className="border-r border-[var(--features-border)]">{t('contactPage.phone')}</div>
                  <div role="columnheader" className="border-r border-[var(--features-border)]">{t('dashboardStats.net')}</div>
                  <div role="columnheader" className="border-r border-[var(--features-border)]">{t('contactPage.notes')}</div>
                  <div role="columnheader" className="text-right">{t('debtsPage.actions')}</div>
                </div>
              </div>
              <div role="row">
                <div role="cell" aria-colspan={5} className="flex min-h-[180px] items-center justify-center px-4 py-10 text-center text-[14px] text-[var(--text-muted)]">
                  {t('contactPage.empty')}
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
