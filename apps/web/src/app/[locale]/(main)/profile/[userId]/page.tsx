import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/Skeleton';

import { SellerProfileContent } from './seller-profile-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;
  return {
    title: `Seller Profile`,
    description: `View seller profile and reviews on Tabadul.`,
  };
}

export default function SellerProfilePage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
      <SellerProfileContent />
    </Suspense>
  );
}
