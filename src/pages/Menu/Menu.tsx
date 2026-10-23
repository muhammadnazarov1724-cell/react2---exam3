import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import DashboardStats from '../../components/DashboardStats'
import DashboardChart from '../../components/DashboardChart'
import RecentPayments from '../../components/RecentPayments'
import AddDebtButton from '../../components/AddDebtButton'

export default function Menu() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-200">
      <div
        id="dashboard-sidebar"
        inert={!sidebarOpen}
        className={`shrink-0 overflow-clip transition-[width] duration-300 ease-in-out motion-reduce:transition-none ${sidebarOpen ? 'w-[76px] sm:w-[252px]' : 'w-0'}`}
      >
        <Sidebar />
      </div>
      <div className="min-w-0 flex-1">
        <DashboardHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="px-5 pt-5 pb-28 font-[Arial,sans-serif] sm:px-10">
          <h1 className="text-[24px] font-semibold">{t('sidebar.dashboard')}</h1>
          <DashboardStats />
          <div className="mt-10 grid grid-cols-1 items-start gap-5 xl:grid-cols-3">
            <div className="min-w-0 xl:col-span-2">
              <DashboardChart />
            </div>
            <RecentPayments />
          </div>
        </div>
      </div>
      <AddDebtButton />
    </div>
  )
}
