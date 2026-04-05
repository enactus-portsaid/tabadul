import type { SupabaseClient } from '@supabase/supabase-js';

export const createInspectionService = (supabase: SupabaseClient) => {
  return {
    async getReport(transactionId: string) {
      return supabase
        .from('inspection_reports')
        .select('*, inspector:profiles!inspector_id(full_name, avatar_url)')
        .eq('transaction_id', transactionId)
        .single();
    },

    async submitReport(
      transactionId: string,
      inspectorId: string,
      result: 'pass' | 'fail',
      notes: string,
      photos: string[] = []
    ) {
      return supabase
        .from('inspection_reports')
        .insert({
          transaction_id: transactionId,
          inspector_id: inspectorId,
          result,
          notes,
          photos,
          inspected_at: new Date().toISOString(),
        })
        .select()
        .single();
    },
  };
};
