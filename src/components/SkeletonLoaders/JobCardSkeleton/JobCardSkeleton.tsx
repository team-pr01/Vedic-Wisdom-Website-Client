
const JobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-primary-80 p-3 xl:p-4 flex flex-col gap-4 relative animate-pulse">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        {/* Avatar Skeleton */}
        <div className="size-12.5 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>

        {/* Title and Name Skeleton */}
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="flex items-center gap-1">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Work Mode Badge Skeleton */}
      <div className="px-2 py-1 bg-gray-200 rounded w-16 h-6 absolute top-3 right-3"></div>

      {/* Description Skeleton */}
      <div className="mt-2 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* Additional Info Skeleton */}
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>

      {/* Divider Skeleton */}
      <div className="bg-gray-200 h-0.5"></div>

      {/* Action Buttons Skeleton */}
      <div className="flex items-center justify-between gap-3">
        {/* Share Button Skeleton */}
        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>

        {/* Right Side Buttons Skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-10 bg-gray-200 rounded-lg w-28"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;