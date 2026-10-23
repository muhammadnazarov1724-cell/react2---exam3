import { useTranslation } from 'react-i18next'

export default function Section3H() {
  const { t } = useTranslation()

  return (
    <section className="bg-[var(--features-background)] px-5 font-[Arial,sans-serif] sm:px-8">
      <div className="mx-auto max-w-[1600px] border-y border-[var(--border)]/50 py-20 sm:py-[150px]">
        <dl className="grid grid-cols-1 gap-y-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center border-[var(--features-border)] px-4">
            <dt className="order-2 mt-3 text-[20px] text-[var(--text-muted)]">{t('stats.users.title')}</dt>
            <dd className="order-1 bg-linear-to-r from-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text text-[64px] leading-none font-extrabold tracking-[-3px] text-transparent sm:text-[72px]">10K+</dd>
            <dd className="order-3 mt-4 text-[14px] text-[var(--features-muted)]">{t('stats.users.description')}</dd>
          </div>
          <div className="flex flex-col items-center border-[var(--features-border)] px-4 sm:border-l">
            <dt className="order-2 mt-3 text-[20px] text-[var(--text-muted)]">{t('stats.debts.title')}</dt>
            <dd className="order-1 bg-linear-to-r from-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text text-[64px] leading-none font-extrabold tracking-[-3px] text-transparent sm:text-[72px]">50K+</dd>
            <dd className="order-3 mt-4 text-[14px] text-[var(--features-muted)]">{t('stats.debts.description')}</dd>
          </div>
          <div className="flex flex-col items-center border-[var(--features-border)] px-4 lg:border-l">
            <dt className="order-2 mt-3 text-[20px] text-[var(--text-muted)]">{t('stats.uptime.title')}</dt>
            <dd className="order-1 bg-linear-to-r from-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text text-[64px] leading-none font-extrabold tracking-[-3px] text-transparent sm:text-[72px]">99.9%</dd>
            <dd className="order-3 mt-4 text-[14px] text-[var(--features-muted)]">{t('stats.uptime.description')}</dd>
          </div>
          <div className="flex flex-col items-center border-[var(--features-border)] px-4 sm:border-l">
            <dt className="order-2 mt-3 text-[20px] text-[var(--text-muted)]">{t('stats.languages.title')}</dt>
            <dd className="order-1 bg-linear-to-r from-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text text-[64px] leading-none font-extrabold tracking-[-3px] text-transparent sm:text-[72px]">3</dd>
            <dd className="order-3 mt-4 text-[14px] text-[var(--features-muted)]">{t('stats.languages.description')}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
