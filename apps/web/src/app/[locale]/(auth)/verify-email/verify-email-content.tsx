'use client';

import { Leaf, Mail, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/Card';
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
        <div className="bg-primary/10 mx-auto flex h-12 w-12 items-center justify-center rounded-xl">
          <Leaf className="text-primary h-6 w-6" />
        </div>

        {/* Email Icon */}
        <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <Mail className="text-primary h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-text-primary text-2xl font-bold">
            Check your email
          </h1>
          <p className="text-text-secondary text-sm">
            We&apos;ve sent a verification link to
          </p>
          {email && (
            <p className="text-text-primary text-sm font-semibold">{email}</p>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-center">
        <p className="text-text-secondary text-sm">
          Click the link in your email to verify your account. If you don&apos;t
          see it, check your spam folder.
        </p>

        {/* Resend */}
        {resent ? (
          <p className="text-primary text-sm font-medium">
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

      <CardFooter className="border-border justify-center border-t py-4">
        <Link
          href={`/${locale}/login`}
          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
        >
          Back to Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
