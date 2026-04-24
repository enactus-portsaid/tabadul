import { z } from 'zod';

export const transactionStatusSchema = z.enum([
  'pending_deposit',
  'deposit_paid',
  'deposit_verified',
  'inspection_scheduled',
  'inspection_passed',
  'inspection_failed',
  'shipping',
  'delivered',
  'approved',
  'disputed',
  'completed',
  'cancelled',
]);

export const shipmentStatusSchema = z.enum([
  'pending',
  'scheduled',
  'picked_up',
  'in_transit',
  'delivered',
]);

// Used when a buyer initiates a transaction to purchase a fixed_price listing
export const createTransactionSchema = z.object({
  listing_id: z.string().uuid('transaction.validation.invalidListing'),
  seller_id: z.string().uuid('transaction.validation.invalidSeller'),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export const updateTransactionStatusSchema = z.object({
  status: transactionStatusSchema,
});

export type UpdateTransactionStatusInput = z.infer<
  typeof updateTransactionStatusSchema
>;

export const updateShipmentStatusSchema = z.object({
  shipment_status: shipmentStatusSchema,
});

export type UpdateShipmentStatusInput = z.infer<
  typeof updateShipmentStatusSchema
>;

export const uploadReceiptSchema = z.object({
  type: z.enum(['deposit', 'remainder'], {
    required_error: 'transaction.validation.receiptTypeRequired',
  }),
  amount: z.number().positive('transaction.validation.receiptAmountPositive'),
  receipt_url: z.string().url('transaction.validation.invalidReceiptUrl'),
});

export type UploadReceiptInput = z.infer<typeof uploadReceiptSchema>;
