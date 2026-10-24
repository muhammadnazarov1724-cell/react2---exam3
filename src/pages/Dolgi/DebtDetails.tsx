import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import { NavLink, useParams } from 'react-router-dom'
import { useDebtStore } from '../../store/useDebtStore'
import EditDebtDialog from '../../components/EditDebtDialog'

export default function DebtDetails() {
  const { t, i18n } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [closeError, setCloseError] = useState(false)
  const editDialogRef = useRef<HTMLDialogElement>(null)
  const closeDialogRef = useRef<HTMLDialogElement>(null)

  const { id } = useParams()
  
  const debts = useDebtStore((state) => state.debts)
  const getDebts = useDebtStore((state) => state.getDebts)
  const updateDebt = useDebtStore((state) => state.updateDebt)
  const closeDebt = useDebtStore((state) => state.closeDebt)

  useEffect(()=> {
    getDebts()
  },[getDebts])

  const debt = debts.find((item) => item.id === id)
  const incoming = debt?.direction === 'they_owe_me'
  const isClosed = debt?.status === 'paid'

  useEffect(() => {
    if (isEditing) editDialogRef.current?.showModal()
  }, [isEditing])

  function dismissCloseDialog() {
    if (isClosing) return
    closeDialogRef.current?.close()
    setCloseError(false)
  }

  async function handleCloseDebt() {
    if (!debt || isClosed || isClosing) return

    setIsClosing(true)
    setCloseError(false)

    try {
      await closeDebt(debt.id)
      closeDialogRef.current?.close()
    } catch (error) {
      console.error('Не удалось закрыть долг:', error)
      setCloseError(true)
    } finally {
      setIsClosing(false)
    }
  }

  function formatDate(value?: string | null) {
  if (!value) return '—'

  const locale =
    i18n.resolvedLanguage === 'tj'
      ? 'tg'
      : i18n.resolvedLanguage

  const date = new Date(
    value.length === 10 ? `${value}T00:00:00` : value
  )

  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

  return (
    <div className="flex min-h-screen bg-[var(--background)] font-[Arial,sans-serif] text-[var(--text-primary)] transition-colors duration-200">
      <div
        id="dashboard-sidebar"
        inert={!sidebarOpen}
        className={`shrink-0 overflow-clip transition-[width] duration-300 ease-in-out motion-reduce:transition-none ${sidebarOpen ? 'w-[76px] sm:w-[252px]' : 'w-0'}`}
      >
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="flex-1 px-5 pt-7 pb-28 sm:px-10 sm:pt-9">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex min-w-0 items-center gap-3.5">
              <NavLink
                to="/dolgi"
                aria-label={t('debtDetails.back')}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[var(--features-border)] bg-[var(--card-background)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[#477eff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </NavLink>
              <div className="min-w-0">
                <h1 className="text-[22px] leading-tight font-semibold tracking-tight sm:text-[24px]">
                  {t('debtDetails.title')}
                </h1>
                <p className="mt-1 truncate text-[13px] text-[var(--text-muted)]">
                  {debt?.contact_name || '—'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={!debt || isClosing}
                onClick={() => setIsEditing(true)}
                className="flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#477eff80] bg-transparent px-3.5 py-2 text-[13px] font-medium text-[#477eff] transition-colors enabled:hover:bg-[#477eff10] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m15 5 4 4M4 20l4-1 12-12a2.8 2.8 0 0 0-4-4L4 15l-1 6m0 0h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t('debtsPage.edit')}
              </button>
              <button
                type="button"
                disabled={!debt || isClosed || isClosing}
                onClick={() => {
                  setCloseError(false)
                  closeDialogRef.current?.showModal()
                }}
                className="min-h-10 cursor-pointer rounded-[8px] bg-[#2aaf87] px-4 py-2 text-[13px] font-medium text-white transition-colors enabled:hover:bg-[#239674] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2aaf87] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {t(isClosed ? 'debtDetails.closed' : 'debtsPage.markClosed')}
              </button>
            </div>
          </div>

          <div className="mt-9 grid grid-cols-1 items-start gap-5 lg:mt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="min-w-0 space-y-5">
              <div className="dashboard-stat overflow-hidden rounded-[13px] border border-[var(--features-border)] bg-[var(--card-background)] shadow-[0_2px_4px_#172b4d03] transition-[background-color,box-shadow] duration-200 hover:shadow-[0_8px_24px_#172b4d06] motion-reduce:transition-none">
                <div className="h-1 bg-[#2aaf87]" />
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[17px] bg-[#2aaf8710] text-[#2aaf87]">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="m8 3 2 4h4l2-4H8ZM9 8c-2 2-5 5-5 8a8 8 0 0 0 16 0c0-3-3-6-5-8H9Z" fill="currentColor" />
                          <path d="M12 11v9m2-7h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3" stroke="var(--card-background)" strokeWidth="1.2" strokeLinecap="round" />
                          <path d="M21 3h-4v4m0-4 4 4" stroke="var(--card-background)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M21 3h-4v4m0-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                      <h2 className="truncate text-[16px] font-semibold">
                        {debt?.contact_name || '—'}
                      </h2>
                        <p className="mt-1 text-[12px] text-[var(--text-muted)]">
                          {debt ? t(incoming ? 'dashboardStats.owedToMe' : 'dashboardStats.iOwe'): '—'}
                        </p>
                      </div>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase ${isClosed ? 'bg-[var(--surface)] text-[var(--text-muted)]' : 'bg-[#2aaf8718] text-[#2aaf87]'}`}>
                      {t(isClosed ? 'debtDetails.closed' : 'debtDetails.active')}
                    </span>
                  </div>

                  <div className="mt-6 flex items-baseline gap-2.5">
                  <span className={`text-[34px] leading-tight font-bold tracking-tight sm:text-[36px] 
                    ${incoming ? 'text-[#2aaf87]' : 'text-[#ed252a]'}`}>{debt ? `${incoming ? '+' : '-'} ${Number(debt.amount).toLocaleString()}` : '—'}</span>
                    <span className="text-[13px] text-[var(--text-muted)]">{debt?.currency ?? '—'}</span>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2.5 flex items-center justify-between gap-3 text-[12px] tabular-nums">
                      <span className="text-[var(--text-muted)]">— / —</span>
                      <span className="font-semibold text-[#2aaf87]">—</span>
                    </div>
                    <div aria-hidden="true" className="h-[7px] overflow-hidden rounded-full bg-[#2aaf871a]" />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="min-w-0 rounded-[15px] border border-[#2aaf8715] bg-[#2aaf8708] p-3.5 sm:p-4">
                      <p className="text-[10px] tracking-wide text-[var(--text-muted)] uppercase">
                        {t('debtDetails.paid')}
                      </p>
                      <p className="mt-1.5 text-[17px] font-semibold text-[#2aaf87]">—</p>
                    </div>
                    <div className="min-w-0 rounded-[15px] border border-[#f08c0015] bg-[#f08c0008] p-3.5 sm:p-4">
                      <p className="text-[10px] tracking-wide text-[var(--text-muted)] uppercase">
                        {t('debtDetails.totalAmount')}
                      </p>
                      <p className="mt-1.5 text-[17px] font-semibold text-[#ed8b00]">{debt ? Number(debt.amount).toLocaleString() : '—'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-chart overflow-hidden rounded-[13px] border border-[var(--features-border)] bg-[var(--card-background)] shadow-[0_2px_4px_#172b4d03] transition-colors duration-200 motion-reduce:transition-none">
                <h2 className="border-b border-[var(--features-border)] px-5 py-5 text-[14px] font-semibold">
                  {t('debtDetails.details')}
                </h2>
                <div className="px-5 sm:px-6">
                  <div className="flex min-h-[62px] items-center justify-between gap-4 border-b border-[var(--features-border)] py-4">
                    <div className="flex items-center gap-2 text-[12px] text-[var(--text-muted)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                        <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M7 3v4m10-4v4M3 10h18M8 14h1m3 0h1m3 0h1m-9 3h1m3 0h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span>{t('debtDetails.createdAt')}</span>
                    </div>
                    <span className="text-[12px] font-semibold tabular-nums">
                      {formatDate(debt?.created_at)}
                    </span>                  </div>
                  <div className="flex min-h-[62px] items-center justify-between gap-4 py-4">
                    <div className="flex items-center gap-2 text-[12px] text-[var(--text-muted)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                        <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M7 3v4m10-4v4M3 10h18M8 14h1m3 0h1m3 0h1m-9 3h1m3 0h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span>{t('debtsPage.dueDate')}</span>
                    </div>
                    <span className="text-[12px] font-semibold tabular-nums">
                      {formatDate(debt?.due_date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="recent-payments min-w-0 overflow-hidden rounded-[13px] border border-[var(--features-border)] bg-[var(--card-background)] shadow-[0_2px_4px_#172b4d03] transition-colors duration-200 motion-reduce:transition-none">
              <div className="flex min-h-[70px] items-center justify-between gap-4 border-b border-[var(--features-border)] px-5 py-4">
                <h2 className="text-[16px] font-semibold">
                  {t('debtDetails.payments', { count: 0 })}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled
                    aria-label={t('debtDetails.removePayment')}
                    className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full bg-[#ed252a30] text-[#ed252a]"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    disabled
                    aria-label={t('debtDetails.addPayment')}
                    className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-full bg-[#2aaf8730] text-[#2aaf87]"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 px-5 py-12 text-center sm:min-h-[220px]">
                <svg width="42" height="42" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="text-[var(--features-muted)] opacity-70">
                  <path d="M8 15v-2a6 6 0 0 1 6-6h13a5 5 0 0 1 5 5v2M10 14h24a6 6 0 0 1 6 6v15a6 6 0 0 1-6 6H13a7 7 0 0 1-7-7V20a6 6 0 0 1 6-6Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M40 23h-6a4 4 0 0 0 0 8h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2ZM14 23h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <p className="text-[13px] text-[var(--text-muted)]">
                  {t('debtDetails.noPayments')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={closeDialogRef}
        aria-labelledby="close-debt-title"
        aria-describedby="close-debt-message"
        aria-busy={isClosing}
        onCancel={(event) => {
          event.preventDefault()
          dismissCloseDialog()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dismissCloseDialog()
        }}
        className="add-debt-dialog fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[440px] overflow-y-auto rounded-[14px] border border-[var(--features-border)] bg-[var(--card-background)] p-0 text-[var(--text-primary)] shadow-xl backdrop:bg-black/40"
      >
        <div className="p-6">
          <h2 id="close-debt-title" className="flex items-center gap-3 text-[18px] font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#2aaf8720] text-[#2aaf87]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                <path d="m8 12 3 3 5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {t('debtDetails.closeTitle')}
          </h2>
          <p id="close-debt-message" className="mt-5 text-[14px] leading-6 text-[var(--text-muted)]">
            {t('debtDetails.closeMessage')}
          </p>
          {closeError && (
            <p role="alert" className="mt-4 text-[14px] text-[#ed252a]">
              {t('debtDetails.closeFailed')}
            </p>
          )}
          <div className="mt-7 flex flex-wrap justify-end gap-2">
            <button type="button" autoFocus disabled={isClosing} onClick={dismissCloseDialog} className="cursor-pointer rounded-lg px-4 py-2.5 text-[13px] text-[var(--text-muted)] hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-[#477eff] disabled:cursor-wait disabled:opacity-60">
              {t('addDebtDialog.cancel')}
            </button>
            <button type="button" disabled={isClosing} onClick={handleCloseDebt} className="cursor-pointer rounded-lg bg-[#2aaf87] px-4 py-2.5 text-[13px] font-medium text-white transition-colors enabled:hover:bg-[#239674] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2aaf87] disabled:cursor-wait disabled:opacity-60">
              {t(isClosing ? 'debtDetails.closing' : 'debtsPage.markClosed')}
            </button>
          </div>
        </div>
      </dialog>

      {debt && isEditing && (
        <EditDebtDialog
          key={debt.id}
          dialogRef={editDialogRef}
          currency={debt.currency}
          defaultValues={{
            name: debt.contact_name ?? '',
            amount: debt.amount,
            direction: debt.direction,
            due_date: debt.due_date?.slice(0, 10) ?? '',
            description: debt.description ?? '',
          }}
          onClose={() => {
            editDialogRef.current?.close()
            setIsEditing(false)
          }}
          onSubmit={async (data) => {
            await updateDebt(debt.id, {
              ...data,
              contact_id: debt.contact_id,
              due_date: data.due_date || undefined,
            })
            editDialogRef.current?.close()
            setIsEditing(false)
          }}
        />
      )}

      <button
        type="button"
        disabled
        aria-label={t('addDebtButton.add')}
        className="fixed right-5 bottom-5 z-40 flex h-14 w-14 cursor-not-allowed items-center justify-center rounded-full bg-[#477eff] text-white shadow-[0_8px_22px_#477eff35] sm:right-8 sm:bottom-8 sm:h-16 sm:w-16"
      >
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
