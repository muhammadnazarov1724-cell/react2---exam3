import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddDebtDialog, { type DebtDirection } from './AddDebtDialog'

export default function AddDebtButton() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [dialogDirection, setDialogDirection] = useState<DebtDirection | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  function openDialog(direction: DebtDirection) {
    setOpen(false)
    setDialogDirection(direction)
  }

  return (
    <>
    <div
      className="fixed right-5 bottom-5 z-40 font-[Arial,sans-serif] sm:right-8 sm:bottom-8"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setOpen(true)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setOpen(false)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false)
          buttonRef.current?.focus()
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label={t('addDebtButton.add')}
        aria-expanded={open}
        aria-controls="add-debt-actions"
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#477eff] text-white shadow-[0_8px_22px_#477eff35] transition-[transform,background-color,box-shadow] duration-200 hover:bg-[#386ff0] hover:shadow-[0_12px_30px_#477eff50] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#477eff] active:scale-95 motion-reduce:transform-none motion-reduce:transition-none sm:h-16 sm:w-16"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-45' : 'rotate-0'}`}>
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <div
        id="add-debt-actions"
        inert={!open}
        className={`absolute right-0 bottom-full flex flex-col items-end gap-3 pb-5 transition-[opacity,translate] duration-200 motion-reduce:transition-none ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
      >
        <button type="button" onClick={() => openDialog('i_owe_them')} className="group flex cursor-pointer items-center gap-3 rounded-full text-[#ed252a] outline-none sm:gap-4">
          <span className="rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] px-4 py-2.5 text-[14px] whitespace-nowrap text-[var(--text-primary)] shadow-[0_2px_5px_#172b4d12] transition-colors duration-200 group-hover:text-[#ed252a] group-focus-visible:text-[#ed252a] motion-reduce:transition-none sm:text-[16px]">
            {t('dashboardStats.iOwe')}
          </span>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--features-border)] bg-[var(--card-background)] shadow-[0_3px_6px_#172b4d20] transition-[transform,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_16px_#ed252a20] group-focus-visible:ring-2 group-focus-visible:ring-[#ed252a] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[var(--background)] group-active:scale-95 motion-reduce:transform-none motion-reduce:transition-none">
            <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m8 3 2 4h4l2-4H8Z" fill="currentColor" />
              <path d="M9 8c-2 2-5 5-5 8a8 8 0 0 0 16 0c0-3-3-6-5-8H9Z" fill="currentColor" />
              <path d="M12 11v9m2-7h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3" stroke="var(--card-background)" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M17 6h4m0 0v4m0-4-4 4" stroke="var(--card-background)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 6h4m0 0v4m0-4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <button type="button" onClick={() => openDialog('they_owe_me')} className="group flex cursor-pointer items-center gap-3 rounded-full text-[#2aaf87] outline-none sm:gap-4">
          <span className="rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] px-4 py-2.5 text-[14px] whitespace-nowrap text-[var(--text-primary)] shadow-[0_2px_5px_#172b4d12] transition-colors duration-200 group-hover:text-[#2aaf87] group-focus-visible:text-[#2aaf87] motion-reduce:transition-none sm:text-[16px]">
            {t('dashboardStats.owedToMe')}
          </span>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--features-border)] bg-[var(--card-background)] shadow-[0_3px_6px_#172b4d20] transition-[transform,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_16px_#2aaf8720] group-focus-visible:ring-2 group-focus-visible:ring-[#2aaf87] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[var(--background)] group-active:scale-95 motion-reduce:transform-none motion-reduce:transition-none">
            <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m8 3 2 4h4l2-4H8Z" fill="currentColor" />
              <path d="M9 8c-2 2-5 5-5 8a8 8 0 0 0 16 0c0-3-3-6-5-8H9Z" fill="currentColor" />
              <path d="M12 11v9m2-7h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3" stroke="var(--card-background)" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M21 6h-4m0 0v4m0-4 4 4" stroke="var(--card-background)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 6h-4m0 0v4m0-4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </div>
    {dialogDirection && (
      <AddDebtDialog
        initialDirection={dialogDirection}
        onClose={() => {
          setDialogDirection(null)
          buttonRef.current?.focus()
        }}
      />
    )}
    </>
  )
}
