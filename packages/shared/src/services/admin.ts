import type { SupabaseClient } from '@supabase/supabase-js';

export const createAdminService = (supabase: SupabaseClient) => {
  return {
    async getUsers(filters?: { role?: string; isActive?: boolean }) {
      let query = supabase.from('profiles').select('*');

      if (filters?.role) {
        query = query.eq('role', filters.role);
      }
      if (filters?.isActive !== undefined) {
        query = query.eq('is_active', filters.isActive);
      }

      return query.order('created_at', { ascending: false });
    },

    async moderateListing(listingId: string, status: 'active' | 'deactivated') {
      return supabase
        .from('listings')
        .update({ status })
        .eq('id', listingId)
        .select()
        .single();
    },

    async getPendingPayments() {
      return supabase
        .from('payments')
        .select(
          '*, transaction:transactions(*), paid_by:profiles!paid_by(full_name, factory_name)'
        )
        .eq('status', 'uploaded')
        .order('created_at', { ascending: true });
    },

    async verifyReceipt(
      paymentId: string,
      adminId: string,
      status: 'verified' | 'rejected',
      notes?: string
    ) {
      return supabase
        .from('payments')
        .update({
          status,
          admin_notes: notes || null,
          verified_by: adminId,
          verified_at: new Date().toISOString(),
        })
        .eq('id', paymentId)
        .select()
        .single();
    },

    async getOpenDisputes() {
      return supabase
        .from('disputes')
        .select('*, transaction:transactions(*), filed_by:profiles!filed_by(*)')
        .eq('status', 'open')
        .order('created_at', { ascending: true });
    },

    async resolveDispute(
      disputeId: string,
      adminId: string,
      adminResolution: string,
      resolutionStatus: 'resolved_buyer' | 'resolved_seller'
    ) {
      return supabase
        .from('disputes')
        .update({
          status: resolutionStatus,
          admin_resolution: adminResolution,
          resolved_by: adminId,
          resolved_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', disputeId)
        .select()
        .single();
    },
  };
};
