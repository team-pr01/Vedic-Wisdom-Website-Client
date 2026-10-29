/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { IoSearchOutline } from "react-icons/io5";
import FilterDropdown from "../../SanathanSthalPage/Filters/FilterDropdown";
import ProductCardSkeleton from "../../../SkeletonLoaders/ProductCardSkeleton/ProductCardSkeleton";
import ProductCard from "../ProductCard/ProductCard";
import type { TProduct } from "../../../../types/product.type";
import Button from "../../../Reusable/Button/Button";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../../../redux/Features/Product/productApi";
import { useCategories } from "../../../../hooks/useCategories";

const AllProducts = () => {
  const LIMIT = 10;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState<any>({ label: "", value: "" });
  const [page, setPage] = useState<number>(1);
  const skip = (page - 1) * LIMIT;

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [keyword, category]);

  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    keyword,
    category: category?.value,
    skip,
    limit: LIMIT,
  });

  const products = data?.data?.data || [];
  const meta = data?.data?.meta;
  const showSkeletons = isLoading || isFetching;

  const handleCategorySelect = (selected: any) => {
    setCategory(selected);
  };

  const { categories } = useCategories({
    areaName: "product",
  });

  const categoryOptions = categories.map((category) => ({
    label: category,
    value: category,
  }));
  return (
    <div className="mt-16">
      <h4 className="text-neutral-90 font-bold text-xl">Explore Products</h4>
      <div className="flex items-center justify-between gap-5 mt-6">
        <div className="relative w-full">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-55"
            placeholder="Search by product name..."
          />
        </div>
        <FilterDropdown
          options={categoryOptions}
          value={category}
          onChange={handleCategorySelect}
          isRequired={false}
          placeholder="Select category"
          dropdownDirection="top-full"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {showSkeletons && page === 1
          ? Array.from({ length: LIMIT }).map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))
          : products?.map((product: TProduct) => (
              <ProductCard key={product?._id} product={product} />
            ))}
      </div>

      {/* Load More / Pagination Section */}
      {!isLoading && products?.length > 0 && meta?.hasMore && (
        <div className="flex justify-center mt-10">
          <Button
            label={isFetching ? "Loading..." : "Load More Products"}
            onClick={() => setPage((prev) => prev + 1)}
            isLoading={isFetching}
            isDisabled={isFetching}
            className="px-8 py-3 font-semibold text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default AllProducts;
