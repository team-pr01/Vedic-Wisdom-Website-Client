const ProductCardSkeleton = () => {
  return (
    <div className="space-y-2 font-Manrope animate-pulse">
      {/* Image skeleton */}
      <div className="rounded-lg w-full h-50 bg-neutral-200" />

      {/* Product name skeleton */}
      <div className="h-5 w-3/4 bg-neutral-200 rounded" />

      {/* Rating and sold count skeleton */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="size-4 bg-neutral-200 rounded" />
          <div className="h-4 w-10 bg-neutral-200 rounded" />
        </div>
        <div className="bg-neutral-200 size-1 rounded-full" />
        <div className="h-4 w-16 bg-neutral-200 rounded" />
      </div>

      {/* Price skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-5 w-16 bg-neutral-200 rounded" />
        <div className="h-3 w-12 bg-neutral-200 rounded" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;