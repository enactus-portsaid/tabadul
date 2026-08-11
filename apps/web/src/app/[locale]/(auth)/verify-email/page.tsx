import type { Metadata } from 'next';
import { Suspense } from 'react';

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
  return (
    <Suspense
      fallback={<div className="flex justify-center p-8">Loading...</div>}
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
