import { useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';
import { authKeys } from '@/lib/queryKeys';
import type {
  AuthUser,
  Profile,
  SignUpMetadata,
  UseAuthReturn,
} from '@tabadul/shared/types';

// ---------------------------------------------------------------------------
// useAuth — Core authentication hook for the mobile app
// ---------------------------------------------------------------------------
// Provides session state, user profile, and auth actions (signIn, signUp,
// signOut, resetPassword). Listens to Supabase auth state changes and
// automatically refreshes cached queries.
//
// Usage:
//   const { user, isAuthenticated, isLoading, signIn, signOut } = useAuth();
// ---------------------------------------------------------------------------
export function useAuth(): UseAuthReturn {
  const queryClient = useQueryClient();

  // -------------------------------------------------------------------------
  // Session Query — fetches the current session from Supabase Auth
  // -------------------------------------------------------------------------
  const {
    data: sessionData,
    isLoading: isSessionLoading,
  } = useQuery({
    queryKey: authKeys.session(),
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
    staleTime: Infinity, // Session is managed by the auth state listener
    retry: false,
  });

  const userId = sessionData?.user?.id;

  // -------------------------------------------------------------------------
  // Profile Query — fetches the user's profile from the `profiles` table
  // -------------------------------------------------------------------------
  const { data: profileData } = useQuery({
    queryKey: authKeys.profile(userId ?? ''),
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      return data as Profile;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // -------------------------------------------------------------------------
  // Auth State Listener — reacts to sign-in, sign-out, token refresh
  // -------------------------------------------------------------------------
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Immediately update the cached session
      queryClient.setQueryData(authKeys.session(), session);

      if (session?.user) {
        // Refetch profile when user signs in or token refreshes
        queryClient.invalidateQueries({
          queryKey: authKeys.profile(session.user.id),
        });
      } else {
        // Clear all auth-related caches on sign-out
        queryClient.removeQueries({ queryKey: authKeys.all });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  // -------------------------------------------------------------------------
  // Build the AuthUser object
  // -------------------------------------------------------------------------
  const user: AuthUser | null = sessionData?.user
    ? {
        id: sessionData.user.id,
        email: sessionData.user.email ?? '',
        profile: profileData ?? null,
      }
    : null;

  // -------------------------------------------------------------------------
  // Auth Actions
  // -------------------------------------------------------------------------
  const signIn = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error: error ? new Error(error.message) : null };
    },
    []
  );

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      metadata: SignUpMetadata
    ) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      return { error: error ? new Error(error.message) : null };
    },
    []
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    queryClient.clear(); // Clear entire query cache on sign out
  }, [queryClient]);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email
    );
    return { error: error ? new Error(error.message) : null };
  }, []);

  return {
    user,
    accessToken: sessionData?.access_token ?? null,
    isLoading: isSessionLoading,
    isAuthenticated: !!sessionData?.user,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
}
