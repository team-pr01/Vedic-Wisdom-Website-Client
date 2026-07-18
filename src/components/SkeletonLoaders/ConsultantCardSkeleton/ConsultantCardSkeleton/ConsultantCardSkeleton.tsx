const ConsultantCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-20 overflow-hidden animate-pulse">
      <div className="p-6">
        {/* Header with Image and Status */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-neutral-20" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="h-5 bg-neutral-20 rounded w-3/4" />
              <div className="w-5 h-5 bg-neutral-20 rounded-full" />
            </div>
            <div className="h-4 bg-neutral-20 rounded w-1/2 mt-1" />
            <div className="flex items-center gap-1 mt-1">
              <div className="h-4 bg-neutral-20 rounded w-8" />
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="w-4 h-4 bg-neutral-20 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-neutral-20">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-neutral-20 rounded" />
            <div className="h-4 bg-neutral-20 rounded w-3/4" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-neutral-20 rounded" />
            <div className="h-4 bg-neutral-20 rounded w-3/4" />
          </div>
        </div>

        {/* Price and Consultation */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-20">
          <div>
            <div className="h-4 bg-neutral-20 rounded w-24" />
            <div className="flex items-baseline gap-1 mt-1">
              <div className="h-7 bg-neutral-20 rounded w-16" />
              <div className="h-4 bg-neutral-20 rounded w-12" />
            </div>
          </div>
          <div className="h-10 bg-neutral-20 rounded-lg w-36" />
        </div>
      </div>
    </div>
  );
};

export default ConsultantCardSkeleton;
