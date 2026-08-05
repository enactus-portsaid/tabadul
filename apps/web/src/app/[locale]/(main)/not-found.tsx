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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted">
            <SearchX className="h-8 w-8 text-text-muted" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-text-primary">
              Page not found
            </h2>
            <p className="text-sm text-text-secondary">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
          </div>

          {/* Action */}
          <Link
            href="/en/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-light"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
