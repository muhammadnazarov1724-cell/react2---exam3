import type { Ref } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { editDebtSchema, type EditDebtFormValues } from '../utils/editDebtSchema'

type EditDebtDialogProps = {
  dialogRef: Ref<HTMLDialogElement>
  defaultValues?: Partial<EditDebtFormValues>
  currency?: string
  onClose: () => void
  onSubmit: SubmitHandler<EditDebtFormValues>
}

const fieldClass = 'h-11 w-full rounded-[9px] border border-[var(--features-border)] bg-[var(--card-background)] px-3 text-[14px] text-[var(--text-primary)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--features-muted)] hover:border-[var(--text-muted)] focus:border-[#477eff] focus:ring-3 focus:ring-[#477eff15] disabled:cursor-not-allowed motion-reduce:transition-none'
const labelClass = 'mb-2 block text-[14px] text-[var(--text-muted)]'
const errorClass = 'mt-1.5 text-[12px] text-[#ed252a]'

export default function EditDebtDialog({
  dialogRef,
  defaultValues,
  currency = 'TJS',
  onClose,
  onSubmit,
}: EditDebtDialogProps) {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditDebtFormValues>({
    resolver: zodResolver(editDebtSchema),
    defaultValues: {
      name: '',
      amount: 0,
      direction: 'they_owe_me',
      due_date: '',
      description: '',
      ...defaultValues,
    },
  })

  async function editDebt(data: EditDebtFormValues) {
    try {
      await onSubmit(data);
    } catch (error) {
      console.log("Не удалось сохранить изменения:", error);
          setError("root", {
      message: "editDebtDialog.saveFailed",
    });
    }
  }

  function closeDialog() {
    reset()
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="edit-debt-title"
      aria-busy={isSubmitting}
      onCancel={(event) => {
        event.preventDefault()
        if (!isSubmitting) closeDialog()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) closeDialog()
      }}
      className="add-debt-dialog fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[760px] overflow-y-auto rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] p-0 font-[Arial,sans-serif] text-[var(--text-primary)] shadow-[0_24px_80px_#00000040] outline-none backdrop:bg-black/50"
    >
      <div className="p-5 sm:p-7">
        <div className="mb-7 flex items-center justify-between gap-3">
          <h2 id="edit-debt-title" className="flex items-center gap-2.5 text-[19px] font-semibold">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3a9 9 0 1 0 9 9M18 2v5h5m-5 0 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 7v10m2-8h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {t('editDebtDialog.title')}
          </h2>
          <button type="button" disabled={isSubmitting} onClick={closeDialog} aria-label={t('addDebtDialog.close')} className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition-[background-color,color] duration-200 hover:bg-[var(--surface)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-[#477eff] disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(editDebt)} noValidate className="space-y-5">
          <div>
            <label htmlFor="edit-debt-name" className={labelClass}>{t('addDebtDialog.name')} *</label>
            <input
              id="edit-debt-name"
              type="text"
              placeholder={t('addDebtDialog.namePlaceholder')}
              className={fieldClass}
              {...register('name')}
            />
            {errors.name && <p role="alert" className={errorClass}>{t(errors.name.message || '')}</p>}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="edit-debt-amount" className={labelClass}>{t('debtsPage.amount')} *</label>
              <div className="relative">
                <input
                  id="edit-debt-amount"
                  type="number"
                  step="0.01"
                  placeholder={t('addDebtDialog.amountPlaceholder')}
                  className={`${fieldClass} pr-14`}
                  {...register('amount', { valueAsNumber: true })}
                />
                <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[12px] text-[var(--text-muted)]">{currency}</span>
              </div>
              {errors.amount && <p role="alert" className={errorClass}>{t(errors.amount.message || '')}</p>}
            </div>

            <div>
              <span id="edit-debt-direction-label" className={labelClass}>{t('addDebtDialog.direction')} *</span>
              <div role="radiogroup" aria-labelledby="edit-debt-direction-label" className="grid h-11 grid-cols-2">
                <label className="relative cursor-pointer">
                  <input type="radio" value="i_owe_them" className="peer sr-only" {...register('direction')} />
                  <span className="flex h-full items-center justify-center rounded-l-[9px] border border-[#ed252a65] px-2 text-[13px] font-medium text-[#ed252a] transition-[background-color,box-shadow] duration-200 hover:bg-[#ed252a15] peer-checked:bg-[#ed252a25] peer-checked:shadow-[inset_0_0_0_1px_#ed252a35] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#ed252a] motion-reduce:transition-none">{t('dashboardStats.iOwe')}</span>
                </label>
                <label className="relative -ml-px cursor-pointer">
                  <input type="radio" value="they_owe_me" className="peer sr-only" {...register('direction')} />
                  <span className="flex h-full items-center justify-center rounded-r-[9px] border border-[#2aaf8780] px-2 text-[13px] font-medium text-[#2aaf87] transition-[background-color,box-shadow] duration-200 hover:bg-[#2aaf8715] peer-checked:bg-[#2aaf8725] peer-checked:shadow-[inset_0_0_0_1px_#2aaf8740] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#2aaf87] motion-reduce:transition-none">{t('dashboardStats.owedToMe')}</span>
                </label>
              </div>
              {errors.direction && <p role="alert" className={errorClass}>{t(errors.direction.message || '')}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="edit-debt-folder" className={labelClass}>{t('addDebtDialog.folder')}</label>
            <div className="flex items-center gap-3">
              <select id="edit-debt-folder" defaultValue="" disabled className={fieldClass}>
                <option value="">{t('addDebtDialog.noFolder')}</option>
              </select>
              <button type="button" disabled aria-label={t('foldersPage.add')} className="flex h-11 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-lg text-[#477eff] opacity-50">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="edit-debt-due-date" className={labelClass}>{t('debtsPage.dueDate')}</label>
            <input id="edit-debt-due-date" type="date" className={fieldClass} {...register('due_date')} />
          </div>

          <div>
            <label htmlFor="edit-debt-description" className={labelClass}>{t('archivePage.description')}</label>
            <textarea
              id="edit-debt-description"
              placeholder={t('addDebtDialog.descriptionPlaceholder')}
              className={`${fieldClass} h-auto min-h-16 resize-y py-3`}
              {...register('description')}
            />
            {errors.description && <p role="alert" className={errorClass}>{t(errors.description.message || '')}</p>}
          </div>

          <div>
            <span className={labelClass}>{t('addDebtDialog.photo')}</span>
            <button type="button" disabled title={t('addDebtDialog.photoUnavailable')} className="flex min-h-14 w-full cursor-not-allowed items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[var(--features-border)] px-3 py-3 text-[13px] text-[var(--text-muted)]">
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M14 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7M3 17l5-5 4 4 4-4 5 5M19 2v6m-3-3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {t('addDebtDialog.addPhoto')}
            </button>
          </div>

          {errors.root && (
          <p role="alert" className={errorClass}>
          {t(errors.root.message || "")}
          </p>
           )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" disabled={isSubmitting} onClick={closeDialog} className="h-10 cursor-pointer rounded-[9px] px-4 text-[14px] font-medium text-[#477eff] transition-[background-color,transform] duration-200 hover:bg-[#477eff10] focus-visible:outline-2 focus-visible:outline-[#477eff] active:scale-95 disabled:cursor-wait disabled:opacity-60 motion-reduce:transform-none motion-reduce:transition-none">{t('addDebtDialog.cancel')}</button>
            <button type="submit" disabled={isSubmitting} className="inline-flex h-11 min-w-[140px] cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-white/15 bg-[#3d6cf0] px-5 text-[14px] font-semibold text-white shadow-[0_5px_14px_#477eff30] transition-[background-color,box-shadow,transform] duration-200 enabled:hover:-translate-y-0.5 enabled:hover:bg-[#305cda] enabled:hover:shadow-[0_8px_22px_#477eff45] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#477eff] enabled:active:translate-y-0 enabled:active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 motion-reduce:transform-none motion-reduce:transition-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12l4 4v12a2 2 0 0 1-2 2ZM7 3v6h10V3M7 21v-8h10v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t(isSubmitting ? 'editDebtDialog.saving' : 'addDebtDialog.save')}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
