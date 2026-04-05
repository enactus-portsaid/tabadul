/** User roles matching the `user_role` enum in the database schema. */
export type UserRole = 'buyer' | 'seller' | 'admin' | 'inspector';

/** Profile row from the `profiles` table. */
export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  company_name: string;
  phone: string | null;
  avatar_url: string | null;
  location: string | null;
  bio: string | null;
  avg_rating: number;
  total_reviews: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

/** Authenticated user object combining Supabase Auth user + app profile. */
export interface AuthUser {
  /** Supabase Auth user ID (UUID). */
  id: string;
  /** User email address. */
  email: string;
  /** App-specific profile data (null if profile hasn't loaded yet). */
  profile: Profile | null;
}

/** Auth session state exposed by the useAuth hook. */
export interface AuthState {
  /** The authenticated user, or null if not logged in. */
  user: AuthUser | null;
  /** Supabase access token for the current session. */
  accessToken: string | null;
  /** Whether the initial session check is still loading. */
  isLoading: boolean;
  /** Whether the user is authenticated. */
  isAuthenticated: boolean;
}

/** Auth action methods exposed by the useAuth hook. */
export interface AuthActions {
  /** Sign in with email and password. */
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null }>;
  /** Sign up with email, password, and user metadata. */
  signUp: (
    email: string,
    password: string,
    metadata: SignUpMetadata
  ) => Promise<{ error: Error | null }>;
  /** Sign out the current user. */
  signOut: () => Promise<void>;
  /** Request a password reset email. */
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

/** Metadata passed during sign-up for profile creation. */
export interface SignUpMetadata {
  full_name: string;
  company_name: string;
  phone: string;
  role: 'buyer' | 'seller';
}

/** Combined auth hook return type. */
export type UseAuthReturn = AuthState & AuthActions;

/** Public route paths that do not require authentication. */
export const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
] as const;

/** Protected route prefixes that require authentication. */
export const PROTECTED_ROUTE_PREFIXES = [
  '/marketplace',
  '/transactions',
  '/chat',
  '/profile',
  '/notifications',
  '/admin',
] as const;
