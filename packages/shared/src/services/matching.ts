import type { SupabaseClient } from '@supabase/supabase-js';

export const createMatchingService = (supabase: SupabaseClient) => {
  return {
    async getRecommendations(userId: string) {
      return supabase
        .from('match_recommendations')
        .select(
          '*, listing:listings(*, seller:profiles(full_name, factory_name))'
        )
        .eq('user_id', userId)
        .eq('is_dismissed', false)
        .order('score', { ascending: false });
    },

    async dismissRecommendation(id: string) {
      return supabase
        .from('match_recommendations')
        .update({ is_dismissed: true })
        .eq('id', id)
        .select()
        .single();
    },
  };
};
