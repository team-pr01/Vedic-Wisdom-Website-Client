const BookCardSkeleton = () => {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="rounded-2xl h-56 bg-linear-to-r from-neutral-20 via-neutral-30/50 to-neutral-20 animate-shimmer" />
      <div className="mt-3 space-y-2">
        <div className="h-5 bg-linear-to-r from-neutral-20 via-neutral-30/50 to-neutral-20 animate-shimmer rounded w-3/4" />
        <div className="h-4 bg-linear-to-r from-neutral-20 via-neutral-30/50 to-neutral-20 animate-shimmer rounded w-1/2" />
      </div>
    </div>
  );
};

export default BookCardSkeleton;
