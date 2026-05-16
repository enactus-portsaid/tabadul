'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Leaf } from 'lucide-react';
import type { ResetPasswordInput } from '@tabadul/shared/schemas';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { ResetPasswordForm } from '@/components/features/auth/ResetPasswordForm';
import { useAuth } from '@/hooks/useAuth';

// ---------------------------------------------------------------------------
// Forgot Password Page — Client Content
// ---------------------------------------------------------------------------
export function ForgotPasswordContent() {
  const { locale } = useParams<{ locale: string }>();
  const { resetPassword, isLoading } = useAuth();
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async (data: ResetPasswordInput) => {
    setServerError('');
    const { error } = await resetPassword(data.email);
    if (error) {
      setServerError(error.message ?? 'Failed to send reset email. Please try again.');
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <Card className="shadow-elevated">
      <CardHeader className="space-y-3 text-center">
        {/* Logo */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Leaf className="h-6 w-6 text-primary" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-text-primary">
            Reset your password
          </h1>
          <p className="text-sm text-text-secondary">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <ResetPasswordForm
          onSubmit={handleResetPassword}
          isLoading={isLoading}
          serverError={serverError}
          isSuccess={isSuccess}
        />
      </CardContent>

      <CardFooter className="justify-center border-t border-border py-4">
        <Link
          href={`/${locale}/login`}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
