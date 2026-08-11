import type { Metadata } from 'next';

import { ForgotPasswordContent } from './forgot-password-content';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Forgot Password',
  description:
    'Reset your Tabadul account password. We will send you a password reset link.',
};

// ---------------------------------------------------------------------------
// Forgot Password Page — Server Component
// ---------------------------------------------------------------------------
export default function ForgotPasswordPage() {
  return <ForgotPasswordContent />;
}
