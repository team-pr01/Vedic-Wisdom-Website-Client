/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoSearchOutline } from "react-icons/io5";
import FilterDropdown from "../../../SanathanSthalPage/Filters/FilterDropdown";
import { useState } from "react";
import ProductCard from "../../ProductCard/ProductCard";
import { useGetMyProductsQuery } from "../../../../../redux/Features/Product/productApi";
import ProductCardSkeleton from "../../../../SkeletonLoaders/ProductCardSkeleton/ProductCardSkeleton";
import type { TProduct } from "../../../../../types/product.type";
import { useCategories } from "../../../../../hooks/useCategories";

const MyProducts = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState<any>({ label: "", value: "" });

  const { data, isLoading, isFetching } = useGetMyProductsQuery({
    keyword,
    category: category?.value,
  });
  const products = data?.data?.data || [];

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

  const showSkeletons = isLoading || isFetching;
  return (
    <div className="font-Manrope mt-16">
      <div className="flex items-center justify-between">
        <h4 className="heading-dashboard">My Products</h4>
        <div className="flex items-center justify-between gap-5">
          <div className="relative w-full">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              onChange={(e) => setKeyword(e.target.value)}
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
      </div>

      <div className="grid grid-cols-5 gap-4 mt-6">
        {showSkeletons
          ? Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))
          : products?.map((product: TProduct) => (
              <ProductCard key={product?._id} product={product} isVendor={true} />
            ))}
      </div>
    </div>
  );
};

export default MyProducts;
