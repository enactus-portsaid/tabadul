import type { Metadata } from 'next';

import { LoginContent } from './login-content';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Log In',
  description: 'Sign in to your Tabadul account to access the B2B industrial waste marketplace.',
};

// ---------------------------------------------------------------------------
// Login Page — Server Component
// ---------------------------------------------------------------------------
export default function LoginPage() {
  return <LoginContent />;
}
