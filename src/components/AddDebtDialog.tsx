import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { axiosRequest } from '../utils/token'
import { useDebtStore } from '../store/useDebtStore'

export type DebtDirection = 'i_owe_them' | 'they_owe_me'

const fieldClass = 'h-11 w-full rounded-[9px] border border-[var(--features-border)] bg-[var(--card-background)] px-3 text-[14px] text-[var(--text-primary)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--features-muted)] hover:border-[var(--text-muted)] focus:border-[#477eff] focus:ring-3 focus:ring-[#477eff15] disabled:cursor-not-allowed motion-reduce:transition-none'

export default function AddDebtDialog({ initialDirection, onClose }: {
  initialDirection: DebtDirection
  onClose: () => void
}) {
  const { t } = useTranslation()
  const getSummary = useDebtStore((state) => state.getSummary)
  const [direction, setDirection] = useState(initialDirection)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow

    dialog?.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  function closeDialog() {
    dialogRef.current?.close()
    onClose()
  }

  async function handleSubmit(event:any) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    const info = {
      name: form.get('name'),
      amount: Number(form.get('amount')),
      direction: form.get('direction')
    }
    console.log(info);
    try {
      const { data: contacts } = await axiosRequest.get('contacts')

      const name = String(info.name).trim()

      let contact = contacts.find(
        (item: {name: string}) => 
         item.name.trim().toLowerCase() === name.toLowerCase()
      )

      if (!contact) {
        const { data } = await axiosRequest.post('/contacts', {
          name: name
        })
        contact = data
      }
      console.log('Контакт:', contact)

      const { data: debt } = await axiosRequest.post('/debts', {
        contact_id: contact.id,
        direction: info.direction,
        amount: info.amount,
        currency: 'TJS',
        description: String(form.get('description') || '').trim(),
        due_date: form.get('due_date') || undefined,
      })
      console.log('Долг сохранён:', debt)
      getSummary()
      closeDialog()
    } catch (error) {
      console.error('Не удалось сохранить долг:', error)
      
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="add-debt-title"
      onCancel={(event) => {
        event.preventDefault()
        closeDialog()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog()
      }}
      className="add-debt-dialog fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[760px] overflow-y-auto rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] p-0 font-[Arial,sans-serif] text-[var(--text-primary)] shadow-[0_24px_80px_#00000040] outline-none backdrop:bg-black/50"
    >
      <div className="p-5 sm:p-7">
        <div className="mb-7 flex items-center justify-between gap-3">
          <h2 id="add-debt-title" className="flex items-center gap-2.5 text-[19px] font-semibold">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3a9 9 0 1 0 9 9M18 2v5h5m-5 0 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 7v10m2-8h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {t('addDebtButton.add')}
          </h2>
          <button type="button" onClick={closeDialog} aria-label={t('addDebtDialog.close')} className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition-[background-color,color] duration-200 hover:bg-[var(--surface)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-[#477eff] motion-reduce:transition-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="debt-name" className="mb-2 block text-[14px] text-[var(--text-muted)]">{t('addDebtDialog.name')} *</label>
            <input id="debt-name" name="name" type="text" maxLength={120} required autoFocus autoComplete="off" placeholder={t('addDebtDialog.namePlaceholder')} className={fieldClass} />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="debt-amount" className="mb-2 block text-[14px] text-[var(--text-muted)]">{t('debtsPage.amount')} *</label>
              <div className="relative">
                <input id="debt-amount" name="amount" type="number" min="0.01" max="1000000000" step="0.01" required placeholder={t('addDebtDialog.amountPlaceholder')} className={`${fieldClass} pr-14`} />
                <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[12px] text-[var(--text-muted)]">TJS</span>
              </div>
            </div>

            <div>
              <span id="debt-direction-label" className="mb-2 block text-[14px] text-[var(--text-muted)]">{t('addDebtDialog.direction')} *</span>
              <input type="hidden" name="direction" value={direction} />
              <div role="group" aria-labelledby="debt-direction-label" className="grid h-11 grid-cols-2">
                <button type="button" aria-pressed={direction === 'i_owe_them'} onClick={() => setDirection('i_owe_them')} className={`cursor-pointer rounded-l-[9px] border border-[#ed252a65] px-2 text-[13px] font-medium text-[#ed252a] transition-[background-color,box-shadow] duration-200 hover:bg-[#ed252a20] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-[#ed252a] motion-reduce:transition-none ${direction === 'i_owe_them' ? 'bg-[#ed252a25] shadow-[inset_0_0_0_1px_#ed252a35]' : 'bg-transparent'}`}>
                  {t('dashboardStats.iOwe')}
                </button>
                <button type="button" aria-pressed={direction === 'they_owe_me'} onClick={() => setDirection('they_owe_me')} className={`-ml-px cursor-pointer rounded-r-[9px] border border-[#2aaf8780] px-2 text-[13px] font-medium text-[#2aaf87] transition-[background-color,box-shadow] duration-200 hover:bg-[#2aaf8720] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-[#2aaf87] motion-reduce:transition-none ${direction === 'they_owe_me' ? 'bg-[#2aaf8725] shadow-[inset_0_0_0_1px_#2aaf8740]' : 'bg-transparent'}`}>
                  {t('dashboardStats.owedToMe')}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="debt-folder" className="mb-2 block text-[14px] text-[var(--text-muted)]">{t('addDebtDialog.folder')}</label>
            <div className="flex items-center gap-3">
              <select id="debt-folder" name="folder_id" defaultValue="" disabled className={fieldClass}>
                <option value="">{t('addDebtDialog.noFolder')}</option>
              </select>
              <button type="button" disabled aria-label={t('foldersPage.add')} className="flex h-11 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-lg text-[#477eff] opacity-50">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="debt-due-date" className="mb-2 block text-[14px] text-[var(--text-muted)]">{t('debtsPage.dueDate')}</label>
            <input id="debt-due-date" name="due_date" type="date" className={fieldClass} />
          </div>

          <div>
            <label htmlFor="debt-description" className="mb-2 block text-[14px] text-[var(--text-muted)]">{t('archivePage.description')}</label>
            <textarea id="debt-description" name="description" maxLength={1000} rows={2} placeholder={t('addDebtDialog.descriptionPlaceholder')} className={`${fieldClass} h-auto min-h-16 resize-y py-3`} />
          </div>

          <div>
            <span className="mb-2 block text-[14px] text-[var(--text-muted)]">{t('addDebtDialog.photo')}</span>
            <button type="button" disabled title={t('addDebtDialog.photoUnavailable')} className="flex min-h-14 w-full cursor-not-allowed items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[var(--features-border)] px-3 py-3 text-[13px] text-[var(--text-muted)]">
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M14 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7M3 17l5-5 4 4 4-4 5 5M19 2v6m-3-3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {t('addDebtDialog.addPhoto')}
            </button>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={closeDialog} className="h-10 cursor-pointer rounded-[9px] px-4 text-[14px] font-medium text-[#477eff] transition-[background-color,transform] duration-200 hover:bg-[#477eff10] focus-visible:outline-2 focus-visible:outline-[#477eff] active:scale-95 motion-reduce:transform-none motion-reduce:transition-none">{t('addDebtDialog.cancel')}</button>
            <button type="submit"  className="h-10 cursor-pointer rounded-[9px] bg-[#477eff] px-5 text-[14px] font-medium text-white opacity-60">{t('addDebtDialog.save')}</button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
