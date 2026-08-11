'use client';

import type { ResetPasswordInput } from '@tabadul/shared/schemas';
import { ArrowLeft, Leaf } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { ResetPasswordForm } from '@/components/features/auth/ResetPasswordForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/Card';
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
      setServerError(
        error.message ?? 'Failed to send reset email. Please try again.'
      );
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <Card className="shadow-elevated">
      <CardHeader className="space-y-3 text-center">
        {/* Logo */}
        <div className="bg-primary/10 mx-auto flex h-12 w-12 items-center justify-center rounded-xl">
          <Leaf className="text-primary h-6 w-6" />
        </div>

        <div className="space-y-1">
          <h1 className="text-text-primary text-2xl font-bold">
            Reset your password
          </h1>
          <p className="text-text-secondary text-sm">
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

      <CardFooter className="border-border justify-center border-t py-4">
        <Link
          href={`/${locale}/login`}
          className="text-primary hover:text-primary/80 flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
