import type { SupabaseClient } from '@supabase/supabase-js';

export const createAuthService = (supabase: SupabaseClient) => {
  return {
    async signIn(email: string, password?: string) {
      if (password) {
        return supabase.auth.signInWithPassword({ email, password });
      }
      return supabase.auth.signInWithOtp({ email });
    },

    async signUp(email: string, password: string, userData: any) {
      return supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
    },

    async signOut() {
      return supabase.auth.signOut();
    },

    async getProfile(userId: string) {
      return supabase.from('profiles').select('*').eq('id', userId).single();
    },

    async updateProfile(userId: string, data: any) {
      return supabase
        .from('profiles')
        .update(data)
        .eq('id', userId)
        .select()
        .single();
    },
  };
};
