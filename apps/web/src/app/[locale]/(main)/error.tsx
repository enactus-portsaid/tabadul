'use client';

import { AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

// ---------------------------------------------------------------------------
// Error Boundary — (main) route group
// ---------------------------------------------------------------------------
// Catches runtime errors in any (main) page and displays a user-friendly
// error screen with retry and navigation options.
// ---------------------------------------------------------------------------
export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  // Log error for debugging (future: Sentry integration)
  console.error('[MainError]', error);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="space-y-6 py-12">
          {/* Error Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-950">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-text-primary">
              Something went wrong
            </h2>
            <p className="text-sm text-text-secondary">
              An unexpected error occurred. Please try again or go back to the
              previous page.
            </p>
            {error.digest && (
              <p className="text-xs text-text-muted">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button onClick={reset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
