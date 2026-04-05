import type { SupabaseClient } from '@supabase/supabase-js';

export const createTransactionService = (supabase: SupabaseClient) => {
  return {
    async getTransactions(userId: string, role: 'buyer' | 'seller') {
      const column = role === 'buyer' ? 'buyer_id' : 'seller_id';
      return supabase
        .from('transactions')
        .select(
          '*, listing:listings(title, category_id, city, photos:listing_photos(storage_path))'
        )
        .eq(column, userId)
        .order('updated_at', { ascending: false });
    },

    async getTransaction(id: string) {
      return supabase
        .from('transactions')
        .select(
          '*, listing:listings(*), buyer:profiles!buyer_id(*), seller:profiles!seller_id(*), payments(*), inspection_reports(*), disputes(*)'
        )
        .eq('id', id)
        .single();
    },

    async createTransaction(data: any) {
      return supabase.from('transactions').insert(data).select().single();
    },

    async updateStatus(id: string, status: string) {
      return supabase
        .from('transactions')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
    },

    async updateShipmentStatus(id: string, shipment_status: string) {
      return supabase
        .from('transactions')
        .update({ shipment_status })
        .eq('id', id)
        .select()
        .single();
    },

    async uploadReceipt(
      transactionId: string,
      paidBy: string,
      type: string,
      amount: number,
      receiptUrl: string
    ) {
      return supabase
        .from('payments')
        .insert({
          transaction_id: transactionId,
          paid_by: paidBy,
          type,
          amount,
          receipt_url: receiptUrl,
          status: 'uploaded',
        })
        .select()
        .single();
    },

    async submitReview(data: any) {
      return supabase.from('reviews').insert(data).select().single();
    },

    async fileDispute(transactionId: string, filedBy: string, reason: string) {
      return supabase
        .from('disputes')
        .insert({
          transaction_id: transactionId,
          filed_by: filedBy,
          reason,
          status: 'open',
        })
        .select()
        .single();
    },
  };
};
