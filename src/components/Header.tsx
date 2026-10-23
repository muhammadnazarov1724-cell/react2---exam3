import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t, i18n } = useTranslation()
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--background)] font-[Arial,sans-serif] text-[var(--text-primary)] transition-colors">
      <div className="mx-auto flex min-h-[129px] max-w-[1732px] flex-wrap items-center justify-between gap-4 px-5 py-6 sm:flex-nowrap sm:px-8 lg:px-0 max-[1795px]:lg:mx-[7.7%]">
        <NavLink to="/" aria-label={t('header.home')} className="flex shrink-0 items-center gap-[18px] no-underline text-inherit">
          <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white">
            <svg viewBox="0 0 56 56" className="h-[46px] w-[46px]" aria-hidden="true">
              <g fill="none" stroke="#717b97" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M28 10v22m-9 1h18M17 15h22M28 10l-3 4m3-4 3 4M20 15l-5 12h10l-5-12Zm16 0-5 12h10l-5-12Z" />
                <path d="M15 27c1 5 9 5 10 0m6 0c1 5 9 5 10 0" />
              </g>
              <text x="28" y="41" textAnchor="middle" fill="#293052" fontSize="11" fontWeight="700">Adl 5:8</text>
              <path d="M17 44h22" stroke="#83b796" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="text-[28px] font-bold tracking-[-1.1px] sm:text-[32px]">Adl 5:8</span>
        </NavLink>

        <nav aria-label={t('header.language')} className="flex items-center gap-4 sm:gap-[23px]">
          <div className={`relative flex items-center gap-[7px] ${dark ? 'text-[#b9c0d5]' : 'text-[#808597]'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M7 8h10M12 6v2m3 0c-.8 5-3.7 7.6-7 9m1-6c1.5 3 4 5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <select aria-label={t('header.language')} value={i18n.resolvedLanguage || 'ru'} onChange={(event) => void i18n.changeLanguage(event.target.value)} className="w-[33px] cursor-pointer appearance-none border-0 bg-transparent py-2 text-[19px] outline-offset-4">
              <option value="ru">RU</option>
              <option value="tj">TJ</option>
              <option value="en">EN</option>
            </select>
          </div>

          <button type="button" onClick={() => setDark(!dark)} aria-label={t(dark ? 'header.lightTheme' : 'header.darkTheme')} className={`flex h-[52px] w-[52px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${dark ? 'bg-[#353e5c]' : 'bg-[#ced3df] hover:bg-[#c1c8d8]'}`}>
            {dark ? (
              <svg width="29" height="29" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 15.4A8.5 8.5 0 0 1 8.6 4 8.5 8.5 0 1 0 20 15.4Z" fill="#dce3ff" /></svg>
            ) : (
              <svg width="31" height="31" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="8" fill="#d68a00" /><path d="M16 3v2m0 22v2M3 16h2m22 0h2M6.8 6.8l1.4 1.4m15.6 15.6 1.4 1.4M6.8 25.2l1.4-1.4M23.8 8.2l1.4-1.4" stroke="#d68a00" strokeWidth="1.8" strokeLinecap="round" /></svg>
            )}
          </button>

          <NavLink to="/register" className={`text-[16px] no-underline transition-colors sm:text-[20px] ${dark ? 'text-[#b9c0d5] hover:text-white' : 'text-[#808597] hover:text-[#20253b]'}`}>{t('header.register')}</NavLink>
          <NavLink to="/login" className={`flex min-h-[53px] items-center justify-center gap-[11px] rounded-[16px] border-[1.5px] px-4 text-[18px] no-underline transition-colors sm:min-w-[150px] sm:px-6 sm:text-[20px] ${dark ? 'border-[#4c5673] bg-[#252e49] hover:bg-[#313c5c]' : 'border-[#c7cede] bg-[#ecf0ff] hover:bg-[#e1e7fc]'}`}>
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 7V5a3 3 0 0 1 3-3h2a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6h-2a3 3 0 0 1-3-3v-2M2 12h12m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {t('header.login')}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
