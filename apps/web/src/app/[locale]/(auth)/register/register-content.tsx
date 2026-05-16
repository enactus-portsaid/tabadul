'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';
import type { SignUpInput } from '@tabadul/shared/schemas';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { SignUpForm } from '@/components/features/auth/SignUpForm';
import { useAuth } from '@/hooks/useAuth';

// ---------------------------------------------------------------------------
// Register Page — Client Content
// ---------------------------------------------------------------------------
export function RegisterContent() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const { signUp, isLoading } = useAuth();
  const [serverError, setServerError] = useState('');

  const handleSignUp = async (data: SignUpInput) => {
    setServerError('');
    const { error } = await signUp(data.email, data.password, {
      full_name: data.fullName,
      company_name: data.companyName,
      role: data.role as 'buyer' | 'seller',
      phone: data.phone ?? '',
    });

    if (error) {
      setServerError(error.message ?? 'Failed to create account. Please try again.');
    } else {
      router.push(`/${locale}/verify-email?email=${encodeURIComponent(data.email)}`);
    }
  };

  return (
    <Card className="shadow-elevated">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Leaf className="h-6 w-6 text-primary" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-text-primary">
            Create your account
          </h1>
          <p className="text-sm text-text-secondary">
            Join Tabadul to start trading industrial materials
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <SignUpForm
          onSubmit={handleSignUp}
          isLoading={isLoading}
          serverError={serverError}
        />
      </CardContent>

      <CardFooter className="justify-center border-t border-border py-4">
        <p className="text-sm text-text-secondary">
          Already have an account?{' '}
          <Link
            href={`/${locale}/login`}
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
