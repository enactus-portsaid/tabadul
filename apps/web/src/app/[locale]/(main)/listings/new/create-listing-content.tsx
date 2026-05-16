'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { CreateListingInput } from '@tabadul/shared/schemas';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CreateListingForm } from '@/components/features/listings/CreateListingForm';
import { useCreateListing } from '@/hooks/api';

// ---------------------------------------------------------------------------
// Waste categories — static for now (future: from API)
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
// Create Listing Content — Client Component
// ---------------------------------------------------------------------------
export function CreateListingContent() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const createListing = useCreateListing();
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (data: CreateListingInput) => {
    setServerError('');
    try {
      const result = await createListing.mutateAsync(data as unknown as Record<string, unknown>);
      const resultData = result as Record<string, unknown> | null;
      if (resultData?.id) {
        router.push(`/${locale}/marketplace/${resultData.id}`);
      } else {
        router.push(`/${locale}/listings/my`);
      }
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Failed to create listing. Please try again.'
      );
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Back Link */}
      <Link
        href={`/${locale}/marketplace`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Marketplace
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Create New Listing</CardTitle>
          <p className="text-sm text-text-secondary">
            Fill in the details below to list your waste material for sale
          </p>
        </CardHeader>
        <CardContent>
          <CreateListingForm
            categories={WASTE_CATEGORIES}
            onSubmit={handleSubmit}
            isLoading={createListing.isPending}
            serverError={serverError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
