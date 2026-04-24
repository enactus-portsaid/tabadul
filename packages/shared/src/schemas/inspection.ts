import { z } from 'zod';

export const submitInspectionReportSchema = z.object({
  transaction_id: z.string().uuid('inspection.validation.invalidTransaction'),
  result: z.enum(['pass', 'fail'], {
    required_error: 'inspection.validation.resultRequired',
  }),
  notes: z
    .string()
    .max(2000, 'inspection.validation.notesMaxLength')
    .optional()
    .nullable(),
  photos: z
    .array(z.string().url('inspection.validation.invalidPhotoUrl'))
    .default([]),
});

export type SubmitInspectionReportInput = z.infer<
  typeof submitInspectionReportSchema
>;
