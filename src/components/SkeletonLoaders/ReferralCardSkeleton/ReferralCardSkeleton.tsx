const ReferralCardSkeleton = () => {
  return (
    <div className="bg-white border border-neutral-20 rounded-xl p-3.5 flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-3">
        {/* Rank Circle Skeleton */}
        <div className="w-7 h-7 rounded-full bg-neutral-20" />

        {/* Avatar Skeleton */}
        <div className="w-10 h-10 rounded-full bg-neutral-20" />

        {/* Name & Email Skeleton */}
        <div className="space-y-2">
          <div className="h-3.5 w-28 bg-neutral-20 rounded" />
          <div className="h-2.5 w-40 bg-neutral-20 rounded" />
        </div>
      </div>

      {/* Rank Badge Skeleton */}
      <div className="h-7 w-20 bg-neutral-20 rounded-lg" />
    </div>
  );
};

export default ReferralCardSkeleton;
