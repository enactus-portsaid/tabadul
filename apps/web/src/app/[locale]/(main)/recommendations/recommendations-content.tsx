'use client';

import { ChevronRight, Sparkles, TrendingUp, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useDismissRecommendation, useRecommendations } from '@/hooks/api';
import { useAuth } from '@/hooks/useAuth';

// ---------------------------------------------------------------------------
// Recommendations Content
// ---------------------------------------------------------------------------
export function RecommendationsContent() {
  const { locale } = useParams<{ locale: string }>();
  const { user } = useAuth();
  const userId = user?.id ?? '';
  const { data: recommendations, isLoading } = useRecommendations(userId);
  const dismissRecommendation = useDismissRecommendation(userId);

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
          <Sparkles className="text-accent h-5 w-5" />
        </div>
        <div>
          <h1 className="text-text-primary text-2xl font-bold">
            AI Recommendations
          </h1>
          <p className="text-text-secondary text-sm">
            Personalized material matches based on your activity and preferences
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-5 w-5 rounded" />
                </div>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : recommendations && recommendations.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(recommendations as Array<Record<string, unknown>>).map((rec) => (
            <Card
              key={String(rec.id)}
              className="group hover:border-primary/20 relative transition-all hover:shadow-md"
            >
              {/* Dismiss button */}
              <button
                type="button"
                onClick={() => dismissRecommendation.mutate(String(rec.id))}
                className="text-text-muted hover:bg-surface-muted hover:text-text-primary absolute top-2 right-2 rounded-lg p-1 opacity-0 transition-all group-hover:opacity-100"
                aria-label="Dismiss recommendation"
              >
                <X className="h-4 w-4" />
              </button>

              <Link href={`/${locale}/marketplace/${rec.listing_id}`}>
                <CardContent className="space-y-3 p-4">
                  {/* Match Score */}
                  <div className="flex items-center gap-2">
                    <Badge variant="accent" className="gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {typeof rec.match_score === 'number'
                        ? `${rec.match_score}% Match`
                        : 'Match'}
                    </Badge>
                  </div>

                  {/* Listing Info */}
                  <h3 className="text-text-primary group-hover:text-primary text-sm font-semibold transition-colors">
                    {typeof rec.listing_title === 'string'
                      ? rec.listing_title
                      : 'Material'}
                  </h3>
                  <p className="text-text-secondary text-xs">
                    {typeof rec.seller_name === 'string'
                      ? rec.seller_name
                      : 'Seller'}{' '}
                    · {typeof rec.location === 'string' ? rec.location : ''}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent text-sm font-bold">
                      EGP {Number(rec.price ?? 0).toLocaleString()}
                    </span>
                    <ChevronRight className="text-text-muted h-4 w-4" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <Sparkles className="text-text-muted mx-auto h-10 w-10" />
            <p className="text-text-primary mt-3 text-sm font-medium">
              No recommendations yet
            </p>
            <p className="text-text-secondary mt-1 text-xs">
              Browse the marketplace and we&apos;ll learn your preferences
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
