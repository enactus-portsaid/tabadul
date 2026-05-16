import type { Metadata } from 'next';

import { RegisterContent } from './register-content';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Create Account',
  description:
    'Create your Tabadul account to join the B2B industrial waste marketplace. Connect with buyers and sellers.',
};

// ---------------------------------------------------------------------------
// Register Page — Server Component
// ---------------------------------------------------------------------------
export default function RegisterPage() {
  return <RegisterContent />;
}
