import { ArrowLeft, SearchX } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/Card';

// ---------------------------------------------------------------------------
// Not Found — (main) route group
// ---------------------------------------------------------------------------
export default function MainNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="space-y-6 py-12">
          {/* Icon */}
          <div className="bg-surface-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <SearchX className="text-text-muted h-8 w-8" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-text-primary text-xl font-semibold">
              Page not found
            </h2>
            <p className="text-text-secondary text-sm">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
          </div>

          {/* Action */}
          <Link
            href="/en/dashboard"
            className="bg-primary text-primary-foreground hover:bg-primary-light inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
