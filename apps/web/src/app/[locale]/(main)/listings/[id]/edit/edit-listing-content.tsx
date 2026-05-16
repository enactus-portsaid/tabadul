'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { CreateListingInput } from '@tabadul/shared/schemas';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { CreateListingForm } from '@/components/features/listings/CreateListingForm';
import { useListing, useUpdateListing } from '@/hooks/api';

// ---------------------------------------------------------------------------
// Waste categories
// ---------------------------------------------------------------------------
const WASTE_CATEGORIES = [
  { value: 'metals', label: 'Metals & Alloys' },
  { value: 'plastics', label: 'Plastics & Polymers' },
  { value: 'chemicals', label: 'Chemicals' },
  { value: 'textiles', label: 'Textiles & Fibers' },
  { value: 'electronics', label: 'Electronic Waste' },
  { value: 'wood', label: 'Wood & Paper' },
  { value: 'glass', label: 'Glass & Ceramics' },
  { value: 'rubber', label: 'Rubber' },
  { value: 'organic', label: 'Organic Waste' },
  { value: 'other', label: 'Other' },
];

// ---------------------------------------------------------------------------
// Edit Listing Content — Client Component
// ---------------------------------------------------------------------------
export function EditListingContent() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const { data: listing, isLoading } = useListing(id);
  const updateListing = useUpdateListing();
  const [serverError, setServerError] = useState('');

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Skeleton className="h-5 w-40" />
        <Card>
          <CardContent className="space-y-4 py-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="py-16 text-center">
        <p className="text-text-secondary">Listing not found</p>
      </div>
    );
  }

  const handleSubmit = async (data: CreateListingInput) => {
    setServerError('');
    try {
      await updateListing.mutateAsync({
        id,
        data: data as unknown as Record<string, unknown>,
      });
      router.push(`/${locale}/marketplace/${id}`);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Failed to update listing.'
      );
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href={`/${locale}/marketplace/${id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Listing
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Edit Listing</CardTitle>
          <p className="text-sm text-text-secondary">
            Update your listing details below
          </p>
        </CardHeader>
        <CardContent>
          <CreateListingForm
            categories={WASTE_CATEGORIES}
            onSubmit={handleSubmit}
            isLoading={updateListing.isPending}
            serverError={serverError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
