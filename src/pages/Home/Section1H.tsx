import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Section1H() {
  const { t } = useTranslation()

  return (
    <section
      className="min-h-[950px] px-5 pb-24 pt-20 text-center font-[Arial,sans-serif] sm:pt-[115px]"

    >
      <div className="mx-auto max-w-[1440px]">
        <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs text-[var(--text-muted)] sm:px-7 sm:text-[18px]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#477eff]" />
          {t('hero.badge')}
        </div>

        <h1 className="mt-12 text-[40px] leading-[1.08] font-bold tracking-[-1.5px] text-[var(--text-primary)] sm:mt-[60px] sm:text-[64px] lg:text-[clamp(64px,5.5vw,112px)] lg:tracking-[-4px]">
          <span className="block">{t('hero.title')}</span>
          <span className="mt-2 block bg-linear-to-r from-[#2462eb] via-[#477eff] to-[#df8d08] bg-clip-text text-transparent">
            {t('hero.titleAccent')}
          </span>
        </h1>

        <p className="mx-auto mt-10 max-w-[900px] text-lg leading-[1.7] font-light text-[var(--text-muted)] sm:mt-[60px] sm:text-[26px]">
          {t('hero.description')}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:mt-[58px] sm:flex-row sm:gap-9">
          <NavLink to="/register" className="inline-flex min-h-[72px] items-center justify-center gap-4 rounded-[17px] bg-linear-to-r from-[#447eff] to-[#2f60e5] px-10 text-[22px] font-semibold text-white shadow-[0_8px_32px_#3974ff40] transition-opacity hover:opacity-90">
            {t('hero.start')}
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 12h17m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </NavLink>
          <NavLink to="/login" className="text-[22px] text-[var(--text-muted)] transition-colors hover:text-[#3269ec]">
            {t('hero.createAccount')}
          </NavLink>
        </div>

        <ul className="mt-[55px] flex flex-wrap justify-center gap-4 text-[17px] text-[var(--text-muted)]">
          <li className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-[22px] py-2">{t('hero.offline')}</li>
          <li className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-[22px] py-2">{t('hero.multilingual')}</li>
          <li className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-[22px] py-2">{t('hero.sync')}</li>
          <li className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-[22px] py-2">{t('hero.security')}</li>
        </ul>
      </div>
    </section>
  )
}
