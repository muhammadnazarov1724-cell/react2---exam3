import { z } from 'zod'

export const editDebtSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'editDebtDialog.validation.nameRequired')
    .max(120, 'editDebtDialog.validation.nameMax'),
  amount: z.number({ error: 'editDebtDialog.validation.amountInvalid' })
    .min(0.01, 'editDebtDialog.validation.amountMin')
    .max(1000000000, 'editDebtDialog.validation.amountMax'),
  direction: z.enum(['i_owe_them', 'they_owe_me'], {
    error: 'editDebtDialog.validation.directionRequired',
  }),
  due_date: z.string(),
  description: z.string()
    .max(1000, 'editDebtDialog.validation.descriptionMax'),
})

export type EditDebtFormValues = z.infer<typeof editDebtSchema>
