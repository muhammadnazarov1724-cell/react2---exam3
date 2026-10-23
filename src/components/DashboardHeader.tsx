import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function DashboardHeader({ sidebarOpen, onToggleSidebar }: {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}) {
  const { t, i18n } = useTranslation()
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const buttonStyle = 'flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-[var(--text-muted)] transition-[color,background-color,transform] duration-200 hover:bg-[var(--surface)] hover:text-[#477eff] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff] motion-reduce:transform-none motion-reduce:transition-none'

  return (
    <div className="dashboard-header sticky top-0 z-30 flex min-h-[76px] flex-wrap items-center justify-between gap-2 bg-[var(--background)] px-4 py-3 font-[Arial,sans-serif] transition-colors duration-200 sm:px-10">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={t(sidebarOpen ? 'dashboardHeader.hideMenu' : 'dashboardHeader.showMenu')}
        aria-expanded={sidebarOpen}
        aria-controls="dashboard-sidebar"
        className={`${buttonStyle} bg-[var(--surface)]`}
      >
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <div className="flex items-center gap-1 sm:gap-3">
        <div className="flex h-10 items-center gap-1 rounded-xl px-2 text-[var(--text-muted)] transition-colors duration-200 hover:bg-[var(--surface)] focus-within:ring-2 focus-within:ring-[#477eff50]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="6" fill="currentColor" opacity="0.15" />
            <path d="M7 8h10M12 6v2m3 0c-.8 5-3.7 7.6-7 9m1-6c1.5 3 4 5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <select
            aria-label={t('header.language')}
            value={i18n.resolvedLanguage || 'ru'}
            onChange={(event) => void i18n.changeLanguage(event.target.value)}
            className="w-7 cursor-pointer appearance-none border-0 bg-transparent py-2 text-[12px] font-medium outline-none"
          >
            <option value="ru">RU</option>
            <option value="tj">TJ</option>
            <option value="en">EN</option>
          </select>
        </div>

        <span className="hidden h-10 w-8 items-center justify-center text-[#82cbb3] sm:flex" title={t('sidebar.dashboard')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <path d="m7.5 12 3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <button
          type="button"
          onClick={() => setDark(!dark)}
          aria-label={t(dark ? 'header.lightTheme' : 'header.darkTheme')}
          title={t(dark ? 'header.lightTheme' : 'header.darkTheme')}
          className={buttonStyle}
        >
          {dark ? (
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 15.4A8.5 8.5 0 0 1 8.6 4 8.5 8.5 0 1 0 20 15.4Z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          )}
        </button>

        <span className="flex h-10 w-9 items-center justify-center text-[var(--text-muted)]" role="img" aria-label={t('dashboardHeader.notifications')} title={t('dashboardHeader.notifications')}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a2 2 0 0 1 2 2v.3a6 6 0 0 1 4 5.7v4l2 3v1H4v-1l2-3v-4a6 6 0 0 1 4-5.7V4a2 2 0 0 1 2-2Z" />
            <path d="M9 20h6a3 3 0 0 1-6 0Z" opacity="0.65" />
          </svg>
        </span>

        <span className="hidden h-10 w-9 items-center justify-center text-[var(--text-muted)] sm:flex" role="img" aria-label={t('dashboardHeader.fullscreen')} title={t('dashboardHeader.fullscreen')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" fill="currentColor" opacity="0.3" />
            <path d="M13 7h4v4m0-4-6 6M7 17h4m-4 0v-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <span className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#c5edff] to-[#66bcfa] text-[27px] ring-2 ring-[var(--background)] transition-transform duration-200 hover:scale-105 motion-reduce:transform-none" role="img" aria-label={t('dashboardHeader.profile')} title={t('dashboardHeader.profile')}>👨🏻‍💻</span>
      </div>
    </div>
  )
}
