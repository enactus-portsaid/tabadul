import type { Metadata } from 'next';

import { RecommendationsContent } from './recommendations-content';

export const metadata: Metadata = {
  title: 'AI Recommendations',
  description:
    'AI-powered material recommendations matched to your business needs.',
};

export default function RecommendationsPage() {
  return <RecommendationsContent />;
}
