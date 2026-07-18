const VastuShastraVideoCardSkeleton = () => {
  return (
    <div className="rounded-2xl relative shadow-food-card border border-primary-80/60 bg-white animate-pulse">
      {/* Video Thumbnail Skeleton */}
      <div className="relative aspect-video h-48 rounded-t-2xl bg-neutral-20" />

      <div className="p-5 space-y-3">
        {/* Title Skeleton */}
        <div className="h-5 bg-neutral-20 rounded w-3/4" />

        {/* Duration & Category Skeleton */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-2">
            <div className="size-4 bg-neutral-20 rounded" />
            <div className="h-4 bg-neutral-20 rounded w-16" />
          </div>
          <div className="flex items-center gap-2">
            <div className="size-4 bg-neutral-20 rounded" />
            <div className="h-4 bg-neutral-20 rounded w-20" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-neutral-20 rounded-lg w-full mt-4" />
      </div>
    </div>
  );
};

export default VastuShastraVideoCardSkeleton;
