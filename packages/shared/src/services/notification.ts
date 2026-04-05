import type { SupabaseClient } from '@supabase/supabase-js';

export const createNotificationService = (supabase: SupabaseClient) => {
  return {
    async getNotifications(userId: string) {
      return supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    },

    async getUnreadCount(userId: string) {
      return supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .match({ user_id: userId, is_read: false });
    },

    async markAsRead(notificationId: string) {
      return supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .select()
        .single();
    },

    async getPreferences(userId: string) {
      return supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();
    },

    async updatePreferences(userId: string, data: any) {
      return supabase
        .from('notification_preferences')
        .upsert(
          { user_id: userId, ...data, updated_at: new Date().toISOString() },
          { onConflict: 'user_id' }
        )
        .select()
        .single();
    },
  };
};
