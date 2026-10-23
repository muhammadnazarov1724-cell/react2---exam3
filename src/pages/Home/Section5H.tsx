import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Section5H() {
  const { t } = useTranslation()

  return (
    <div className="bg-[var(--features-background)] px-5 py-20 font-[Arial,sans-serif] sm:px-8 lg:pb-[115px] lg:pt-[130px]">
      <div className="mx-auto max-w-[1250px] rounded-[30px] border border-[var(--border)] bg-[var(--surface)] px-6 py-14 text-center sm:px-12 sm:py-20">
        <h2 className="text-[34px] leading-[1.15] font-bold tracking-[-1.5px] text-[var(--text-primary)] sm:text-[48px] lg:text-[58px]">
          {t('cta.title')}
          <span className="mt-1 block text-[var(--features-muted)]">{t('cta.subtitle')}</span>
        </h2>

        <p className="mx-auto mt-9 max-w-[560px] text-lg leading-[1.7] text-[var(--features-muted)] sm:mt-10 sm:text-[20px]">
          {t('cta.description')}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:mt-12 sm:flex-row">
          <NavLink to="/register" className="inline-flex min-h-[68px] items-center justify-center gap-4 rounded-[16px] bg-linear-to-r from-[#447eff] to-[#2f60e5] px-10 text-[20px] font-semibold text-white shadow-[0_8px_32px_#3974ff20] transition-opacity hover:opacity-90">
            {t('cta.start')}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 12h17m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </NavLink>
          <NavLink to="/login" className="inline-flex min-h-[68px] items-center justify-center rounded-[16px] border border-[var(--features-border)] px-10 text-[20px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">
            {t('cta.login')}
          </NavLink>
        </div>
      </div>
    </div>
  )
}
