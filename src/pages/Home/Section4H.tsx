import { useTranslation } from 'react-i18next'

export default function Section4H() {
  const { t } = useTranslation()

  return (
    <div className="bg-[var(--features-background)] px-5 py-20 font-[Arial,sans-serif] sm:px-8 lg:py-[145px]">
      <div className="mx-auto max-w-[1560px]">
        <div className="text-center">
          <p className="text-sm font-bold tracking-[3px] text-[#f49b00]">{t('steps.label')}</p>
          <h2 className="mt-7 text-[34px] leading-[1.2] font-bold tracking-[-1.5px] text-[var(--text-primary)] sm:text-[48px] lg:text-[60px]">
            {t('steps.title')}{' '}
            <span className="text-[var(--features-muted)]">{t('steps.subtitle')}</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-[30px] md:grid-cols-2 lg:mt-[105px] lg:grid-cols-4">
          <div className="relative rounded-[22px] border border-[var(--features-border)] bg-[var(--features-card)] p-8 lg:p-9">
            <div className="flex items-start justify-between gap-4">
              <span className="text-[60px] leading-none font-extrabold tracking-[-3px] text-[var(--text-primary)] opacity-5">01</span>
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[15px] border border-[#477eff14] bg-[#477eff0a] text-[#477eff]">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><circle cx="12" cy="7" r="5"/><path d="M3 23a9 9 0 0 1 18 0Z"/><path d="M10 7h4m-2-2v4" stroke="white" strokeWidth="1.5"/></svg>
              </div>
            </div>
            <h3 className="mt-9 text-[23px] leading-[1.5] font-bold tracking-[-0.5px] text-[var(--text-primary)]">{t('steps.step1.title')}</h3>
            <p className="mt-3 text-[18px] leading-[1.65] font-light text-[var(--features-muted)]">{t('steps.step1.description')}</p>
            <span aria-hidden="true" className="absolute top-1/2 -right-[31px] hidden h-px w-[61px] bg-[var(--border)] lg:block" />
          </div>
          <div className="relative rounded-[22px] border border-[var(--features-border)] bg-[var(--features-card)] p-8 lg:p-9">
            <div className="flex items-start justify-between gap-4">
              <span className="text-[60px] leading-none font-extrabold tracking-[-3px] text-[var(--text-primary)] opacity-5">02</span>
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[15px] border border-[#477eff14] bg-[#477eff0a] text-[#477eff]">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><rect x="2" y="2" width="12" height="15" rx="3"/><rect x="11" y="9" width="12" height="15" rx="3" stroke="var(--features-card)" strokeWidth="1.5"/><path d="M15 16h4m-2-2v4" stroke="white" strokeWidth="1.5"/></svg>
              </div>
            </div>
            <h3 className="mt-9 text-[23px] leading-[1.5] font-bold tracking-[-0.5px] text-[var(--text-primary)]">{t('steps.step2.title')}</h3>
            <p className="mt-3 text-[18px] leading-[1.65] font-light text-[var(--features-muted)]">{t('steps.step2.description')}</p>
            <span aria-hidden="true" className="absolute top-1/2 -right-[31px] hidden h-px w-[61px] bg-[var(--border)] lg:block" />
          </div>
          <div className="relative rounded-[22px] border border-[var(--features-border)] bg-[var(--features-card)] p-8 lg:p-9">
            <div className="flex items-start justify-between gap-4">
              <span className="text-[60px] leading-none font-extrabold tracking-[-3px] text-[var(--text-primary)] opacity-5">03</span>
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[15px] border border-[#477eff14] bg-[#477eff0a] text-[#477eff]">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><rect x="3" y="11" width="4" height="11" rx="1"/><rect x="10" y="7" width="4" height="15" rx="1"/><rect x="17" y="3" width="4" height="19" rx="1"/><path d="M2 25h20" stroke="currentColor"/></svg>
              </div>
            </div>
            <h3 className="mt-9 text-[23px] leading-[1.5] font-bold tracking-[-0.5px] text-[var(--text-primary)]">{t('steps.step3.title')}</h3>
            <p className="mt-3 text-[18px] leading-[1.65] font-light text-[var(--features-muted)]">{t('steps.step3.description')}</p>
            <span aria-hidden="true" className="absolute top-1/2 -right-[31px] hidden h-px w-[61px] bg-[var(--border)] lg:block" />
          </div>
          <div className="relative rounded-[22px] border border-[var(--features-border)] bg-[var(--features-card)] p-8 lg:p-9">
            <div className="flex items-start justify-between gap-4">
              <span className="text-[60px] leading-none font-extrabold tracking-[-3px] text-[var(--text-primary)] opacity-5">04</span>
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[15px] border border-[#477eff14] bg-[#477eff0a] text-[#477eff]">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><circle cx="13" cy="13" r="11"/><path d="m8 13 3 3 7-7" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <h3 className="mt-9 text-[23px] leading-[1.5] font-bold tracking-[-0.5px] text-[var(--text-primary)]">{t('steps.step4.title')}</h3>
            <p className="mt-3 text-[18px] leading-[1.65] font-light text-[var(--features-muted)]">{t('steps.step4.description')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
