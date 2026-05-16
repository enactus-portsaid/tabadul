import type { Metadata } from 'next';

import { VerifyEmailContent } from './verify-email-content';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Verify Your Email',
  description: 'Check your inbox to verify your Tabadul account email address.',
};

// ---------------------------------------------------------------------------
// Verify Email Page — Server Component
// ---------------------------------------------------------------------------
export default function VerifyEmailPage() {
  return <VerifyEmailContent />;
}
