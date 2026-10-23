import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebtStore } from '../store/useDebtStore'

export default function DashboardStats() {
  const { t, i18n } = useTranslation()
  const { they_owe_me: owedToMe, i_owe_them: iOwe } = useDebtStore((state) => state.summary)
  const getSummary = useDebtStore((state) => state.getSummary)
  const locale = i18n.resolvedLanguage === 'tj' ? 'tg' : i18n.resolvedLanguage

  useEffect(() => {
    getSummary()
  }, [getSummary])

  return (
    <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-3">
      <div className="dashboard-stat group flex min-h-[108px] items-center justify-between gap-4 rounded-[22px] border border-[#2bb78c] bg-[var(--background)] p-5 shadow-[0_2px_4px_#172b4d05] transition-[translate,box-shadow,background-color] duration-200 hover:-translate-y-1 hover:shadow-[0_10px_28px_#2bb78c15] motion-reduce:translate-y-0 motion-reduce:transition-none sm:p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-[#ed910015] text-[#e68b00] transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="2" y="4" width="19" height="17" rx="5" />
            <rect x="15" y="10" width="8" height="6" rx="3" stroke="var(--background)" strokeWidth="1.5" />
            <circle cx="18" cy="13" r="1" fill="var(--background)" />
          </svg>
        </div>
        <div className="min-w-0 text-right">
          <p className="text-[14px] font-semibold text-[var(--text-muted)]">{t('dashboardStats.net')}</p>
          <p className="mt-3 flex flex-wrap items-baseline justify-end gap-1.5 tabular-nums">
            <span className="text-[24px] leading-none font-semibold text-[#e68b00]">{(owedToMe - iOwe).toLocaleString(locale)}</span>
            <span className="text-[14px] font-medium text-[var(--text-muted)]">TJS</span>
          </p>
        </div>
      </div>

      <div className="dashboard-stat group flex min-h-[108px] items-center justify-between gap-4 rounded-[22px] border border-transparent bg-[var(--card-background)] p-5 shadow-[0_2px_4px_#172b4d03] transition-[translate,box-shadow,background-color] duration-200 hover:-translate-y-1 hover:shadow-[0_10px_28px_#2aaf8715] motion-reduce:translate-y-0 motion-reduce:transition-none sm:p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-[#2aaf8715] text-[#2aaf87] transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none">
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="2" y="5" width="20" height="16" rx="4" />
            <path d="M3 11h18M6 16h3m3 0h2" fill="none" stroke="var(--card-background)" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="14" y="1" width="9" height="9" rx="3" stroke="var(--card-background)" strokeWidth="1.5" />
            <path d="M18.5 3.5v4m-2-2h4" fill="none" stroke="var(--card-background)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
        <div className="min-w-0 text-right">
          <p className="text-[14px] font-semibold text-[var(--text-muted)]">{t('dashboardStats.owedToMe')}</p>
          <p className="mt-3 flex flex-wrap items-baseline justify-end gap-1.5 tabular-nums">
            <span className="text-[24px] leading-none font-semibold text-[#2aaf87]">{owedToMe.toLocaleString(locale)}</span>
            <span className="text-[14px] font-medium text-[var(--text-muted)]">TJS</span>
          </p>
        </div>
      </div>

      <div className="dashboard-stat group flex min-h-[108px] items-center justify-between gap-4 rounded-[22px] border border-transparent bg-[var(--card-background)] p-5 shadow-[0_2px_4px_#172b4d03] transition-[translate,box-shadow,background-color] duration-200 hover:-translate-y-1 hover:shadow-[0_10px_28px_#ed252a12] motion-reduce:translate-y-0 motion-reduce:transition-none sm:p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-[#ed252a15] text-[#ed252a] transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none">
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="2" y="5" width="20" height="16" rx="4" />
            <path d="M3 11h18M6 16h3m3 0h2" fill="none" stroke="var(--card-background)" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="14" y="1" width="9" height="9" rx="3" stroke="var(--card-background)" strokeWidth="1.5" />
            <path d="M18.5 3.5v4m-2-2h4" fill="none" stroke="var(--card-background)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
        <div className="min-w-0 text-right">
          <p className="text-[14px] font-semibold text-[var(--text-muted)]">{t('dashboardStats.iOwe')}</p>
          <p className="mt-3 flex flex-wrap items-baseline justify-end gap-1.5 tabular-nums">
            <span className="text-[24px] leading-none font-semibold text-[#ed252a]">{iOwe.toLocaleString(locale)}</span>
            <span className="text-[14px] font-medium text-[var(--text-muted)]">TJS</span>
          </p>
        </div>
      </div>
    </div>
  )
}
