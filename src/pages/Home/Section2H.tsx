import { useTranslation } from 'react-i18next'

export default function Section2H() {
  const { t } = useTranslation()

  return (
    <section id="features" className="scroll-mt-36 bg-[var(--features-background)] px-5 py-[70px] font-[Arial,sans-serif] sm:px-8">
      <div className="mx-auto max-w-[1520px]">
        <div className="text-center">
          <p className="text-sm font-bold tracking-[3px] text-[#477eff]">{t('features.label')}</p>
          <h2 className="mt-6 text-[34px] leading-[1.15] font-bold tracking-[-1.5px] text-[var(--text-primary)] sm:text-[48px] lg:text-[60px]">
            {t('features.title')}
            <span className="mt-1 block text-[var(--features-muted)]">{t('features.subtitle')}</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-[30px] md:grid-cols-2 lg:mt-[100px] lg:grid-cols-3">
          <article className="rounded-[22px] border border-[var(--features-border)] bg-[var(--features-card)] p-7 sm:p-10">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border" style={{ color: '#477eff', backgroundColor: '#477eff0a', borderColor: '#477eff14' }}>
              <svg width="27" height="27" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Z"/><path d="M12 6v14M6 9h3m-3 4h3" stroke="white" strokeWidth="1.2" fill="none"/></svg>
            </div>
            <h3 className="mt-7 text-[23px] font-bold tracking-[-0.5px] text-[var(--text-primary)]">{t('features.book.title')}</h3>
            <p className="mt-7 text-[18px] leading-[1.65] font-light text-[var(--features-muted)]">{t('features.book.description')}</p>
          </article>
          <article className="rounded-[22px] border border-[var(--features-border)] bg-[var(--features-card)] p-7 sm:p-10">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border" style={{ color: '#25ac89', backgroundColor: '#25ac890a', borderColor: '#25ac8914' }}>
              <svg width="27" height="27" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><circle cx="8" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="13" cy="13" r="3"/><ellipse cx="5" cy="13" rx="4" ry="2.5"/><ellipse cx="21" cy="13" rx="3" ry="2.5"/><ellipse cx="13" cy="21" rx="5" ry="3"/></svg>
            </div>
            <h3 className="mt-7 text-[23px] font-bold tracking-[-0.5px] text-[var(--text-primary)]">{t('features.contacts.title')}</h3>
            <p className="mt-7 text-[18px] leading-[1.65] font-light text-[var(--features-muted)]">{t('features.contacts.description')}</p>
          </article>
          <article className="rounded-[22px] border border-[var(--features-border)] bg-[var(--features-card)] p-7 sm:p-10">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border" style={{ color: '#f49b00', backgroundColor: '#f49b000a', borderColor: '#f49b0014' }}>
              <svg width="27" height="27" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><rect x="2" y="5" width="20" height="16" rx="5"/><rect x="16" y="10" width="8" height="6" rx="3" stroke="white" strokeWidth="1.5"/><circle cx="19" cy="13" r="1" fill="white"/></svg>
            </div>
            <h3 className="mt-7 text-[23px] font-bold tracking-[-0.5px] text-[var(--text-primary)]">{t('features.offline.title')}</h3>
            <p className="mt-7 text-[18px] leading-[1.65] font-light text-[var(--features-muted)]">{t('features.offline.description')}</p>
          </article>
          <article className="rounded-[22px] border border-[var(--features-border)] bg-[var(--features-card)] p-7 sm:p-10">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border" style={{ color: '#ed5681', backgroundColor: '#ed56810a', borderColor: '#ed568114' }}>
              <svg width="27" height="27" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><rect x="3" y="8" width="4" height="13" rx="1.5"/><rect x="10" y="2" width="4" height="19" rx="1.5"/><rect x="17" y="13" width="4" height="8" rx="1.5"/><path d="M1 22h22" stroke="currentColor" strokeWidth="2"/></svg>
            </div>
            <h3 className="mt-7 text-[23px] font-bold tracking-[-0.5px] text-[var(--text-primary)]">{t('features.analytics.title')}</h3>
            <p className="mt-7 text-[18px] leading-[1.65] font-light text-[var(--features-muted)]">{t('features.analytics.description')}</p>
          </article>
          <article className="rounded-[22px] border border-[var(--features-border)] bg-[var(--features-card)] p-7 sm:p-10">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border" style={{ color: '#8055ff', backgroundColor: '#8055ff0a', borderColor: '#8055ff14' }}>
              <svg width="27" height="27" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><path d="m12 2 9 4v7c0 5-9 10-9 10S3 18 3 13V6l9-4Z"/><path d="m7 13 3 3 7-7" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="mt-7 text-[23px] font-bold tracking-[-0.5px] text-[var(--text-primary)]">{t('features.security.title')}</h3>
            <p className="mt-7 text-[18px] leading-[1.65] font-light text-[var(--features-muted)]">{t('features.security.description')}</p>
          </article>
          <article className="rounded-[22px] border border-[var(--features-border)] bg-[var(--features-card)] p-7 sm:p-10">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border" style={{ color: '#35c4d3', backgroundColor: '#35c4d30a', borderColor: '#35c4d314' }}>
              <svg width="27" height="27" viewBox="0 0 26 26" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke="white" strokeWidth="1.4"/><path d="M3 7c6 2 12 2 18 0M3 17c6-2 12-2 18 0M2 12h20" fill="none" stroke="white" strokeWidth="1.4"/></svg>
            </div>
            <h3 className="mt-7 text-[23px] font-bold tracking-[-0.5px] text-[var(--text-primary)]">{t('features.languages.title')}</h3>
            <p className="mt-7 text-[18px] leading-[1.65] font-light text-[var(--features-muted)]">{t('features.languages.description')}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
