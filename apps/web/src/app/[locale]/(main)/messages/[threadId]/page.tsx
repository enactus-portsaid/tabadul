import type { Metadata } from 'next';

import { ChatDetailContent } from './chat-detail-content';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ threadId: string }>;
}): Promise<Metadata> {
  const { threadId } = await params;
  return {
    title: `Chat`,
    description: `Chat thread ${threadId.slice(0, 8)} on Tabadul.`,
  };
}

// ---------------------------------------------------------------------------
// Chat Detail Page (Mobile) — Server Component
// ---------------------------------------------------------------------------
export default function ChatDetailPage() {
  return <ChatDetailContent />;
}
