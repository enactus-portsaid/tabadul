import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/Skeleton';

import { MessagesContent } from './messages-content';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Messages',
  description: 'Chat with buyers and sellers on Tabadul.',
};

// ---------------------------------------------------------------------------
// Messages Page — Server Component
// ---------------------------------------------------------------------------
export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh-10rem)] gap-4">
          <Skeleton className="hidden w-80 rounded-xl lg:block" />
          <Skeleton className="flex-1 rounded-xl" />
        </div>
      }
    >
      <MessagesContent />
    </Suspense>
  );
}
