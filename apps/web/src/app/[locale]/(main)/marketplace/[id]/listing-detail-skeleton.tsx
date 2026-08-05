import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

// ---------------------------------------------------------------------------
// Listing Detail Loading Skeleton
// ---------------------------------------------------------------------------
export function ListingDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-5 w-40" />
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Image */}
        <div className="lg:col-span-3 space-y-4">
          <Skeleton className="aspect-[16/10] w-full rounded-xl" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-16 rounded-lg" />
            ))}
          </div>
          <Card>
            <CardContent className="space-y-2 p-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        </div>
        {/* Right: Info */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="space-y-4 pt-4">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-24 w-full rounded-xl" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-11 w-full rounded-lg" />
              <div className="flex gap-2">
                <Skeleton className="h-9 flex-1 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-5 w-16 mb-3" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
