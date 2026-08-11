'use client';

import type { UpdateProfileInput } from '@tabadul/shared/schemas';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { UpdateProfileForm } from '@/components/features/auth/UpdateProfileForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';

// ---------------------------------------------------------------------------
// Edit Profile Content
// ---------------------------------------------------------------------------
export function EditProfileContent() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: UpdateProfileInput) => {
    setServerError('');
    setIsSubmitting(true);
    try {
      // TODO: Integrate with profile update mutation
      // For now, redirect back to profile
      router.push(`/${locale}/profile`);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Failed to update profile.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href={`/${locale}/profile`}
        className="text-text-secondary hover:text-text-primary inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Profile
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Edit Profile</CardTitle>
          <p className="text-text-secondary text-sm">
            Update your personal and company information
          </p>
        </CardHeader>
        <CardContent>
          <UpdateProfileForm
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
            serverError={serverError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
