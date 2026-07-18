const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) => {
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
