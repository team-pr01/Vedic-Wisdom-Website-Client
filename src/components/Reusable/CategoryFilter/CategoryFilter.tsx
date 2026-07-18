const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  isLoading = false,
}: {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isLoading?: boolean;
}) => {
  // Skeleton loading state
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 flex-wrap animate-pulse">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="px-4 py-2 rounded-3xl bg-neutral-20 h-10 w-20"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {categories?.map((category: string) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-3xl border border-primary-80 hover:bg-primary-10 hover:text-white transition duration-300 text-sm ${
            selectedCategory === category
              ? "bg-primary-10 text-white"
              : "bg-white text-neutral-40"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
