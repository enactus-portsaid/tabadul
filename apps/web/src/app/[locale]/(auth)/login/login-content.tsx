'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';
import type { SignInInput } from '@tabadul/shared/schemas';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { SignInForm } from '@/components/features/auth/SignInForm';
import { useAuth } from '@/hooks/useAuth';

// ---------------------------------------------------------------------------
// Login Page — Client Content
// ---------------------------------------------------------------------------
export function LoginContent() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  const [serverError, setServerError] = useState('');

  const handleSignIn = async (data: SignInInput) => {
    setServerError('');
    const { error } = await signIn(data.email, data.password);
    if (error) {
      setServerError(error.message ?? 'Invalid email or password. Please try again.');
    } else {
      router.push(`/${locale}/dashboard`);
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
            Welcome back
          </h1>
          <p className="text-sm text-text-secondary">
            Sign in to your Tabadul account
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <SignInForm
          onSubmit={handleSignIn}
          isLoading={isLoading}
          serverError={serverError}
        />

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <Link
            href={`/${locale}/forgot-password`}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </CardContent>

      <CardFooter className="justify-center border-t border-border py-4">
        <p className="text-sm text-text-secondary">
          Don&apos;t have an account?{' '}
          <Link
            href={`/${locale}/register`}
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Create Account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
