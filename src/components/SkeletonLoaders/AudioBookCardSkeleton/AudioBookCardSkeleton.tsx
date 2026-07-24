const AudioBookCardSkeleton = ({
  direction = "col",
}: {
  direction?: "row" | "col";
}) => {
  const isRow = direction === "row";

  return (
    <div
      className={`rounded relative ${isRow ? "border border-neutral-55" : ""} animate-pulse`}
    >
      <div className={`${isRow ? "flex" : "flex flex-col"} gap-2`}>
        {/* Image Skeleton */}
        <div
          className={`bg-neutral-20 ${
            isRow ? "w-38 h-30 rounded-l" : "w-full h-47 rounded-md"
          }`}
        />

        <div
          className={`${isRow ? "py-2 px-1" : "p-0"} flex flex-col justify-between flex-1`}
        >
          {/* Title Skeleton */}
          <div className="space-y-2">
            <div
              className={`h-5 bg-neutral-20 rounded ${isRow ? "w-24" : "w-3/4"}`}
            />
            <div
              className={`h-4 bg-neutral-20 rounded ${isRow ? "w-16" : "w-1/2"}`}
            />
          </div>

          {/* Description Skeleton (Row only) */}
          {isRow && (
            <div className="mt-1">
              <div className="h-3 bg-neutral-20 rounded w-32" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioBookCardSkeleton;
