const VastuTipsCardSkeleton = () => {
  return (
    <div className="p-6 bg-white border border-neutral-20 rounded-2xl animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-6 bg-neutral-20 rounded w-3/4" />
        <div className="h-5 bg-neutral-20 rounded-full w-16" />
      </div>

      {/* Tips List Skeleton */}
      <div className="flex flex-col gap-4 mt-5">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="flex gap-2">
            <div className="size-5 bg-neutral-20 rounded flex-shrink-0" />
            <div className="h-5 bg-neutral-20 rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VastuTipsCardSkeleton;
