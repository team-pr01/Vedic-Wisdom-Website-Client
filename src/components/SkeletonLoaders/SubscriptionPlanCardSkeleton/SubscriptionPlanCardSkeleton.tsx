const SubscriptionPlanCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-neutral-55 bg-white p-6 relative h-fit animate-pulse">
      {/* Header (Title & Icon) */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-neutral-200 rounded-md" />
        <div className="size-10 bg-neutral-200 rounded-full" />
      </div>

      {/* Description */}
      <div className="mt-3 space-y-2">
        <div className="h-4 w-full bg-neutral-200 rounded" />
        <div className="h-4 w-4/5 bg-neutral-200 rounded" />
      </div>

      {/* Price */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-end gap-1">
          <div className="h-9 w-24 bg-neutral-200 rounded-md" />
          <div className="h-4 w-12 bg-neutral-200 rounded mb-1" />
        </div>
        {/* Popular badge skeleton (optional, if you want it to show a placeholder) */}
        <div className="h-6 w-24 bg-neutral-200 rounded-full" />
      </div>

      {/* Features List */}
      <div className="space-y-3 mt-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="size-5 bg-neutral-200 rounded-full shrink-0" />
            <div className="h-4 w-3/4 bg-neutral-200 rounded" />
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="h-[42px] w-full bg-neutral-200 rounded-lg mt-8" />
    </div>
  );
};

export default SubscriptionPlanCardSkeleton;