'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Leaf, Mail, RefreshCcw } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';

// ---------------------------------------------------------------------------
// Verify Email Page — Client Content
// ---------------------------------------------------------------------------
export function VerifyEmailContent() {
  const { locale } = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const { resetPassword, isLoading } = useAuth();
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    if (!email) return;
    // Use resetPassword as a resend mechanism (Supabase re-sends confirmation)
    await resetPassword(email);
    setResent(true);
  };

  return (
    <Card className="shadow-elevated">
      <CardHeader className="space-y-4 text-center">
        {/* Logo */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Leaf className="h-6 w-6 text-primary" />
        </div>

        {/* Email Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-8 w-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-text-primary">
            Check your email
          </h1>
          <p className="text-sm text-text-secondary">
            We&apos;ve sent a verification link to
          </p>
          {email && (
            <p className="text-sm font-semibold text-text-primary">
              {email}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-center">
        <p className="text-sm text-text-secondary">
          Click the link in your email to verify your account.
          If you don&apos;t see it, check your spam folder.
        </p>

        {/* Resend */}
        {resent ? (
          <p className="text-sm font-medium text-primary">
            ✓ Verification email resent!
          </p>
        ) : (
          <Button
            variant="outline"
            onClick={handleResend}
            isLoading={isLoading}
            disabled={isLoading || !email}
            className="gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Resend Email
          </Button>
        )}
      </CardContent>

      <CardFooter className="justify-center border-t border-border py-4">
        <Link
          href={`/${locale}/login`}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Back to Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
