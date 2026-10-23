import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const currentYear = new Date().getFullYear()

export default function DashboardChart() {
  const { t } = useTranslation()
  const [year, setYear] = useState(currentYear)
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

  return (
    <div className="dashboard-chart min-w-0 rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] p-5 shadow-[0_2px_4px_#172b4d03] transition-[border-color,box-shadow,background-color] duration-300 hover:shadow-[0_8px_30px_#172b4d08] motion-reduce:transition-none sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-[16px] leading-relaxed font-semibold text-[var(--text-primary)]">
          {t('dashboardChart.title')}
        </h2>

        <div className="relative shrink-0">
          <select
            aria-label={t('dashboardChart.year')}
            value={year}
            onChange={(event) => setYear(Number(event.target.value))}
            className="h-[35px] w-[90px] cursor-pointer appearance-none rounded-[9px] border border-[var(--features-border)] bg-[var(--card-background)] pl-3 pr-8 text-[12px] text-[var(--text-primary)] outline-none transition-[border-color,box-shadow] duration-200 hover:border-[#aebed8] focus:border-[#477eff] focus:ring-2 focus:ring-[#477eff20]"
          >
            {[currentYear, currentYear - 1, currentYear - 2].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden="true">
            <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[var(--text-primary)]">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#2aaf87]" />
          <span>{t('dashboardChart.lent')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#ed252a]" />
          <span>{t('dashboardChart.borrowed')}</span>
        </div>
      </div>

      <div key={year} className="mt-4 overflow-x-auto pb-1">
        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={t('dashboardChart.description', { year })}
          className="block h-auto w-full min-w-[520px] overflow-visible font-[Arial,sans-serif]"
        >
          <g stroke="var(--features-border)" strokeWidth="1" strokeDasharray="3 4" opacity="0.8">
            <line x1="50" y1="23" x2="738" y2="23" />
            <line x1="50" y1="65" x2="738" y2="65" />
            <line x1="50" y1="107" x2="738" y2="107" />
            <line x1="50" y1="149" x2="738" y2="149" />
            <line x1="50" y1="191" x2="738" y2="191" />
            <line x1="50" y1="233" x2="738" y2="233" />
            <line x1="50" y1="275" x2="738" y2="275" />
          </g>

          <g fill="var(--text-muted)" fontSize="11" textAnchor="end">
            <text x="39" y="27">3k</text>
            <text x="39" y="111">2k</text>
            <text x="39" y="195">1k</text>
            <text x="39" y="279">0k</text>
          </g>

          <path className="dashboard-chart-line" d="M50 275H738" pathLength="1" fill="none" stroke="#2aaf87" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          <path className="dashboard-chart-line" d="M50 275H738" pathLength="1" fill="none" stroke="#ed252a" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />

          {months.map((month, index) => {
            const x = 50 + (index * 688) / 11

            return (
              <g key={month} className="dashboard-chart-point">
                <title>{`${t(`dashboardChart.months.${month}`)}: ${t('dashboardStats.owedToMe')} — 0 TJS; ${t('dashboardStats.iOwe')} — 0 TJS`}</title>
                <rect x={x - 12} y="263" width="24" height="24" fill="transparent" />
                <circle cx={x} cy="275" r="4" fill="#2aaf87" stroke="var(--card-background)" strokeWidth="1.5" />
                <circle cx={x} cy="275" r="2" fill="#ed252a" />
                <text x={x} y="302" fill="var(--text-muted)" fontSize="11" textAnchor="middle">
                  {t(`dashboardChart.months.${month}`)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
