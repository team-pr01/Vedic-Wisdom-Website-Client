const AyurvedaCardSkeleton = () => {
  return (
    <div className="rounded-2xl relative shadow-food-card border border-primary-80/60 bg-white p-3 space-y-3 animate-pulse">
      {/* Video Thumbnail Skeleton */}
      <div className="rounded-xl overflow-hidden bg-neutral-20 aspect-video w-full h-56" />

      {/* Title Skeleton */}
      <div className="h-6 bg-neutral-20 rounded w-3/4" />

      {/* Duration & Category Skeleton */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className="size-4 bg-neutral-20 rounded" />
          <div className="h-4 bg-neutral-20 rounded w-16" />
        </div>
        <div className="flex items-center gap-1">
          <div className="size-3.5 bg-neutral-20 rounded" />
          <div className="h-4 bg-neutral-20 rounded w-20" />
        </div>
      </div>
    </div>
  );
};

export default AyurvedaCardSkeleton;
