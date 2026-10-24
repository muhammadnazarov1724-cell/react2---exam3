import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { Contact, ContactFormData } from '../store/useContactStore'

const fieldClass = 'w-full rounded-lg border border-[var(--features-border)] bg-[var(--card-background)] px-3 py-3 text-[14px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[#477eff] focus:ring-2 focus:ring-[#477eff20]'
const labelClass = 'mb-2 block text-[13px] text-[var(--text-muted)]'
const errorClass = 'mt-2 text-[12px] text-[#ed252a]'

export default function ContactDialog({ contact, onClose, onSubmit }: {
  contact?: Contact
  onClose: () => void
  onSubmit: (data: ContactFormData) => Promise<void>
}) {
  const { t } = useTranslation()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    defaultValues: { name: contact?.name ?? '', phone: contact?.phone ?? '', note: contact?.note ?? '' },
  })

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

  async function saveContact(data: ContactFormData) {
    try {
      await onSubmit(data)
      onClose()
    } catch (error) {
      console.error('Не удалось сохранить контакт:', error)
      setError('root', { message: 'contactPage.saveFailed' })
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="contact-dialog-title"
      aria-busy={isSubmitting}
      onCancel={(event) => { event.preventDefault(); if (!isSubmitting) onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget && !isSubmitting) onClose() }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[480px] overflow-y-auto rounded-[14px] border border-[var(--features-border)] bg-[var(--card-background)] p-6 font-[Arial,sans-serif] text-[var(--text-primary)] shadow-[0_24px_80px_#00000030] outline-none backdrop:bg-black/50"
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 id="contact-dialog-title" className="text-[19px] font-semibold">{t(contact ? 'contactPage.edit' : 'contactPage.add')}</h2>
        <button type="button" disabled={isSubmitting} onClick={onClose} aria-label={t('addDebtDialog.close')} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[24px] text-[var(--text-muted)] hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-[#477eff] disabled:cursor-wait">×</button>
      </div>

      <form onSubmit={handleSubmit(saveContact)} noValidate className="space-y-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>{t('debtsPage.fullName')} *</label>
          <input id="contact-name" autoFocus autoComplete="name" className={fieldClass} {...register('name', {
            validate: (value) => !!value.trim() || 'contactPage.validation.nameRequired',
            maxLength: { value: 120, message: 'contactPage.validation.nameMax' },
          })} />
          {errors.name && <p role="alert" className={errorClass}>{t(errors.name.message || '')}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>{t('contactPage.phone')}</label>
          <input id="contact-phone" type="tel" autoComplete="tel" className={fieldClass} {...register('phone', {
            maxLength: { value: 40, message: 'contactPage.validation.phoneMax' },
          })} />
          {errors.phone && <p role="alert" className={errorClass}>{t(errors.phone.message || '')}</p>}
        </div>
        <div>
          <label htmlFor="contact-note" className={labelClass}>{t('contactPage.notes')}</label>
          <textarea id="contact-note" rows={3} className={`${fieldClass} resize-y`} {...register('note', {
            maxLength: { value: 1000, message: 'contactPage.validation.noteMax' },
          })} />
          {errors.note && <p role="alert" className={errorClass}>{t(errors.note.message || '')}</p>}
        </div>
        {errors.root && <p role="alert" className={errorClass}>{t(errors.root.message || '')}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" disabled={isSubmitting} onClick={onClose} className="cursor-pointer rounded-lg px-4 py-2.5 text-[14px] text-[#477eff] hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-[#477eff] disabled:cursor-wait">{t('addDebtDialog.cancel')}</button>
          <button type="submit" disabled={isSubmitting} className="cursor-pointer rounded-lg bg-[#477eff] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#386ff0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff] disabled:cursor-wait disabled:opacity-60">{t(isSubmitting ? 'editDebtDialog.saving' : 'addDebtDialog.save')}</button>
        </div>
      </form>
    </dialog>
  )
}
