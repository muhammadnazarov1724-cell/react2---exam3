import { useTranslation } from 'react-i18next'

export default function RecentPayments() {
  const { t } = useTranslation()

  return (
    <div className="recent-payments min-w-0 overflow-hidden rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] shadow-[0_2px_4px_#172b4d03] transition-[box-shadow,background-color] duration-300 hover:shadow-[0_8px_30px_#172b4d08] motion-reduce:transition-none">
      <div className="border-b border-[var(--features-border)] px-5 py-5 sm:px-6">
        <h2 className="text-[16px] leading-relaxed font-semibold text-[var(--text-primary)]">
          {t('recentPayments.title')}
        </h2>
      </div>

      <div className="flex min-h-[280px] flex-col items-center justify-center px-5 py-10 text-center sm:px-6">
        <div className="relative mb-6 flex h-[68px] w-[68px] items-center justify-center rounded-[20px] border border-[var(--border)] bg-[var(--surface)] text-[#477eff]" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M9 4h14a2 2 0 0 1 2 2v22l-3-2-3 2-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 11h8m-8 5h8m-8 5h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <span className="absolute -right-2 -bottom-2 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-[var(--card-background)] bg-[#2aaf87] text-white">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="m4 8 3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <p className="text-[15px] font-semibold text-[var(--text-primary)]">
          {t('recentPayments.emptyTitle')}
        </p>
        <p className="mt-2 max-w-[240px] text-[13px] leading-6 text-[var(--text-muted)]">
          {t('recentPayments.emptyDescription')}
        </p>
      </div>
    </div>
  )
}
