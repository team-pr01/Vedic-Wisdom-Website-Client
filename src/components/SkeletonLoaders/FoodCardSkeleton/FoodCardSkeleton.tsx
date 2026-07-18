
const FoodCardSkeleton = () => {
  return (
    <div className="rounded-2xl relative shadow-food-card border border-primary-80/60 bg-white overflow-hidden animate-pulse">
      {/* Video Thumbnail Skeleton */}
      <div className="relative aspect-video h-56 rounded-t-2xl bg-neutral-20" />

      <div className="p-5">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-neutral-20 rounded w-[80%]" />
          <div className="h-6 bg-neutral-20 rounded w-16" />
        </div>

        {/* Duration Skeleton */}
        <div className="flex items-center gap-2 mt-2">
          <div className="size-4 bg-neutral-20 rounded" />
          <div className="h-4 bg-neutral-20 rounded w-20" />
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-neutral-20 rounded-lg w-full mt-3" />
      </div>
    </div>
  );
};

export default FoodCardSkeleton;
