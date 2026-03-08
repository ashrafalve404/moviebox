export default function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-zinc-800 rounded-lg ${className}`} />
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden">
      <div className="aspect-[2/3] bg-zinc-800 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-zinc-800 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-zinc-800 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}

export function MovieRowSkeleton() {
  return (
    <div className="px-4 md:px-8 mb-8">
      <div className="h-6 bg-zinc-800 rounded w-40 mb-4 animate-pulse" />
      <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex-shrink-0 w-[140px] md:w-[180px]">
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroBannerSkeleton() {
  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full bg-zinc-900">
      <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
    </div>
  );
}

export function MovieDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="aspect-[2/3] bg-zinc-800 rounded-lg animate-pulse" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="h-10 bg-zinc-800 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-zinc-800 rounded w-1/2 animate-pulse" />
          <div className="h-20 bg-zinc-800 rounded w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
