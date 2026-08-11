'use client';

import type { SignUpInput } from '@tabadul/shared/schemas';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { SignUpForm } from '@/components/features/auth/SignUpForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/Card';
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
      setServerError(
        error.message ?? 'Failed to create account. Please try again.'
      );
    } else {
      router.push(
        `/${locale}/verify-email?email=${encodeURIComponent(data.email)}`
      );
    }
  };

  return (
    <Card className="shadow-elevated">
      <CardHeader className="space-y-3 text-center">
        <div className="bg-primary/10 mx-auto flex h-12 w-12 items-center justify-center rounded-xl">
          <Leaf className="text-primary h-6 w-6" />
        </div>

        <div className="space-y-1">
          <h1 className="text-text-primary text-2xl font-bold">
            Create your account
          </h1>
          <p className="text-text-secondary text-sm">
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

      <CardFooter className="border-border justify-center border-t py-4">
        <p className="text-text-secondary text-sm">
          Already have an account?{' '}
          <Link
            href={`/${locale}/login`}
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
