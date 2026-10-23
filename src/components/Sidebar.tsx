import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { handleLogout } from '../utils/token'
import { useUserStore } from '../store/useUserStore'

export default function Sidebar() {

  const user = useUserStore((state) => state.user)

  const { t } = useTranslation()
  const [accountOpen, setAccountOpen] = useState(false)
  const accountButtonRef = useRef<HTMLButtonElement>(null)
  const logoutButtonRef = useRef<HTMLButtonElement>(null)
  const profileLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (accountOpen) logoutButtonRef.current?.focus()
  }, [accountOpen])

  function closeAccountMenu() {
    setAccountOpen(false)
    accountButtonRef.current?.focus()
  }

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `group flex min-h-[44px] items-center justify-center gap-4 rounded-[9px] px-4 py-3 text-[14px] transition-[color,background-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff] motion-reduce:transition-none sm:justify-start ${
      isActive
        ? 'bg-[var(--surface)] font-medium text-[#477eff]'
        : 'text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]'
    }`

  return (
    <>
    <div className="sidebar-panel sticky top-0 flex h-dvh w-[76px] shrink-0 flex-col border-r border-dashed border-[var(--features-border)] bg-[var(--background)] font-[Arial,sans-serif] transition-colors duration-200 sm:w-[252px]">
      <div className="flex-1 overflow-y-auto px-2.5 pb-6 pt-4">
        <NavLink to="/" aria-label={t('sidebar.home')} className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#477eff] motion-reduce:transform-none sm:ml-3">
          <svg viewBox="0 0 56 56" className="h-8 w-8" aria-hidden="true">
            <g fill="none" stroke="#717b97" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M28 10v22m-9 1h18M17 15h22M28 10l-3 4m3-4 3 4M20 15l-5 12h10l-5-12Zm16 0-5 12h10l-5-12Z" />
              <path d="M15 27c1 5 9 5 10 0m6 0c1 5 9 5 10 0" />
            </g>
            <text x="28" y="41" textAnchor="middle" fill="#293052" fontSize="11" fontWeight="700">Adl 5:8</text>
            <path d="M17 44h22" stroke="#83b796" strokeWidth="1.5" />
          </svg>
        </NavLink>

        <p className="mb-3 mt-8 hidden px-3 text-[11px] font-semibold text-[var(--text-muted)] sm:block">ADL 5:8</p>

        <div role="navigation" aria-label={t('sidebar.navigation')} className="mt-7 space-y-1 sm:mt-0">
          <NavLink to="/menu" end className={linkStyle} title={t('sidebar.dashboard')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none" aria-hidden="true">
              <rect x="2" y="2" width="9" height="9" rx="3" />
              <rect x="13" y="2" width="9" height="9" rx="3" opacity="0.4" />
              <rect x="2" y="13" width="9" height="9" rx="3" opacity="0.4" />
              <rect x="13" y="13" width="9" height="9" rx="3" />
            </svg>
            <span className="hidden sm:block">{t('sidebar.dashboard')}</span>
          </NavLink>

          <NavLink to="/dolgi" className={linkStyle} title={t('sidebar.debts')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none" aria-hidden="true">
              <rect x="1" y="5" width="22" height="15" rx="4" opacity="0.35" />
              <ellipse cx="12" cy="12.5" rx="3" ry="4" />
              <path d="M5 10v5m14-5v5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:block">{t('sidebar.debts')}</span>
          </NavLink>

          <NavLink to="/archive" className={linkStyle} title={t('sidebar.archive')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none" aria-hidden="true">
              <path d="m5 8 1.2 12a2 2 0 0 0 2 1.8h7.6a2 2 0 0 0 2-1.8L19 8Z" opacity="0.35" />
              <path d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-5 7h4m-3 4h2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:block">{t('sidebar.archive')}</span>
          </NavLink>

          <NavLink to="/contact" className={linkStyle} title={t('sidebar.contacts')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none" aria-hidden="true">
              <circle cx="9" cy="7" r="4" />
              <ellipse cx="9" cy="18" rx="8" ry="4" />
              <path d="M15 3a4 4 0 0 1 0 8m3 3c3 0 5 2 5 4s-2 3-5 3" opacity="0.4" />
            </svg>
            <span className="hidden sm:block">{t('sidebar.contacts')}</span>
          </NavLink>

          <NavLink to="/papki" className={linkStyle} title={t('sidebar.folders')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none" aria-hidden="true">
              <path d="M2 6a3 3 0 0 1 3-3h4l3 4h7a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3Z" opacity="0.35" />
              <rect x="2" y="10" width="20" height="12" rx="3" />
              <path d="M10 15h4" fill="none" stroke="var(--background)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:block">{t('sidebar.folders')}</span>
          </NavLink>
        </div>
      </div>

      <button
        ref={accountButtonRef}
        type="button"
        onClick={() => setAccountOpen(!accountOpen)}
        aria-label={t('sidebar.account')}
        aria-expanded={accountOpen}
        aria-haspopup="dialog"
        aria-controls={accountOpen ? 'sidebar-account-menu' : undefined}
        className="flex min-h-[68px] w-full cursor-pointer items-center justify-center gap-3 border-t border-[var(--features-border)] px-3 py-3 text-left transition-colors duration-200 hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#477eff] motion-reduce:transition-none sm:justify-start sm:px-5"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#d2f2ff] to-[#7dc7fa] text-[25px]" aria-hidden="true">👨🏻‍💻</span>
        <span className="hidden min-w-0 flex-1 sm:block">
          <span className="block truncate text-[14px] text-[var(--text-primary)]">{user?.name}</span>
          <span className="mt-0.5 block text-[11px] text-[var(--text-muted)]">{t('sidebar.account')}</span>
        </span>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`hidden shrink-0 text-[var(--text-muted)] transition-transform duration-200 motion-reduce:transition-none sm:block ${accountOpen ? 'rotate-180' : 'rotate-0'}`}>
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>

    {accountOpen && createPortal(
      <div
        className="fixed inset-0 z-50 font-[Arial,sans-serif] transition-opacity duration-150 starting:opacity-0 motion-reduce:transition-none"
        onKeyDown={(event) => {
          if (event.key === 'Escape') closeAccountMenu()
          if (event.key === 'Tab') {
            event.preventDefault()
            if (document.activeElement === logoutButtonRef.current) {
              profileLinkRef.current?.focus()
            } else {
              logoutButtonRef.current?.focus()
            }
          }
        }}
      >
        <button type="button" tabIndex={-1} onClick={closeAccountMenu} aria-label={t('sidebar.closeAccountMenu')} className="absolute inset-0 h-full w-full cursor-default bg-black/20" />
        <div
          id="sidebar-account-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t('sidebar.account')}
          className="absolute bottom-[80px] left-3 w-[124px] rounded-[8px] border border-[var(--features-border)] bg-[var(--card-background)] p-1.5 text-[13px] text-[var(--text-primary)] shadow-[0_6px_24px_#172b4d18] transition-[opacity,translate] duration-150 starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none sm:left-[116px]"
        >
          <button
            ref={logoutButtonRef}
            type="button"
            onClick={handleLogout}
            className="flex min-h-9 w-full cursor-pointer items-center rounded-[5px] px-3 py-2 text-left outline-none transition-colors duration-150 hover:bg-[#ed252a10] hover:text-[#ed252a] focus-visible:bg-[var(--surface)] focus-visible:ring-2 focus-visible:ring-[#477eff] motion-reduce:transition-none"
          >
            {t('sidebar.logout')}
          </button>
          <NavLink ref={profileLinkRef} to="/profile" onClick={() => setAccountOpen(false)} className="flex min-h-9 w-full items-center rounded-[5px] px-3 py-2 text-left outline-none transition-colors duration-150 hover:bg-[var(--surface)] hover:text-[#477eff] focus-visible:bg-[var(--surface)] focus-visible:ring-2 focus-visible:ring-[#477eff] motion-reduce:transition-none">
            {t('sidebar.profile')}
          </NavLink>
        </div>
      </div>,
      document.body,
    )}
    </>
  )
}
