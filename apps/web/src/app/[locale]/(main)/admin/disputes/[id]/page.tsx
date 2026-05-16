import type { Metadata } from 'next';

import { DisputeDetailContent } from './dispute-detail-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Dispute #${id}`,
    description: 'Review and resolve dispute details.',
  };
}

export default function DisputeDetailPage() {
  return <DisputeDetailContent />;
}
