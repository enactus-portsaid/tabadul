'use client';

import type { SignInInput } from '@tabadul/shared/schemas';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { SignInForm } from '@/components/features/auth/SignInForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/Card';
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
      setServerError(
        error.message ?? 'Invalid email or password. Please try again.'
      );
    } else {
      router.push(`/${locale}/dashboard`);
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
          <h1 className="text-text-primary text-2xl font-bold">Welcome back</h1>
          <p className="text-text-secondary text-sm">
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
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </CardContent>

      <CardFooter className="border-border justify-center border-t py-4">
        <p className="text-text-secondary text-sm">
          Don&apos;t have an account?{' '}
          <Link
            href={`/${locale}/register`}
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Create Account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
