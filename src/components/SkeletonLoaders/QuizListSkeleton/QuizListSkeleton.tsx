const QuizListSkeleton = () => {
  return (
    <div className="animate-pulse font-Manrope">
      {/* Header Section Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 mt-10">
        {/* Title Skeleton */}
        <div className="h-8 w-48 bg-neutral-200 rounded-md" />

        {/* Prize Badge Skeleton */}
        <div className="flex items-center gap-2 bg-[#FCF9F2] border border-[#F2E8D9] px-4 py-2 rounded-full shadow-sm w-32 h-10" />
      </div>

      {/* Quiz Cards Carousel Skeleton */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
        {/* Render 4 placeholder cards to mimic the layout */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="shrink-0 snap-start">
            {/* Card Skeleton (matches w-63 from your QuizLevelCard) */}
            <div className="bg-white p-4 border border-primary-80 rounded-xl w-63 h-47.5">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="h-6 w-20 bg-neutral-200 rounded-md" />
                <div className="bg-neutral-100 border border-neutral-200 size-8 rounded-full" />
              </div>

              {/* Card Stats (Questions & Duration) */}
              <div className="flex items-center justify-between mt-6 mb-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-3 w-16 bg-neutral-200 rounded" />
                  <div className="h-3 w-6 bg-neutral-200 rounded" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-3 w-14 bg-neutral-200 rounded" />
                  <div className="h-3 w-10 bg-neutral-200 rounded" />
                </div>
              </div>

              {/* Start Button Skeleton */}
              <div className="w-full h-11 bg-neutral-200 rounded-lg mt-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizListSkeleton;