/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGES } from "../../../assets";
import Button from "../../../components/Reusable/Button/Button";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import ProductCard from "../../../components/Dashboard/VedicShopPage/ProductCard/ProductCard";
import ProductImageCarousel from "../../../components/Reusable/ProductImageCarousel/ProductImageCarousel";
import { Link } from "react-router-dom";
import FilterDropdown from "../../../components/Dashboard/SanathanSthalPage/Filters/FilterDropdown";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useGetAllProductsQuery } from "../../../redux/Features/Product/productApi";
import type { TProduct } from "../../../types/product.type";
import ProductCardSkeleton from "../../../components/SkeletonLoaders/ProductCardSkeleton/ProductCardSkeleton";
import { useCategories } from "../../../hooks/useCategories";

const VedicShop = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState<any>({ label: "", value: "" });
  console.log(category);

  // Debounce: update `keyword` 500ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    keyword,
    category: category?.value,
  });

  const products = data?.data?.data || [];
  const showSkeletons = isLoading || isFetching;

  const banners = [
    IMAGES.dummyShopBanner,
    IMAGES.dummyShopBanner,
    IMAGES.dummyShopBanner,
    IMAGES.dummyShopBanner,
  ];

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
    <div className="font-Manrope">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <DashboardHeading
          title="Vedic Products"
          description="Discover Products That Inspire Your Spiritual Journey"
        />
        <Link to={"/dashboard/vedic-shop/become-a-vendor"}>
          <Button
            label="Become a Vendor"
            className="bg-[#f2c94c] hover:bg-[#e0b83d] text-black border-none shadow-md px-6 py-3 font-semibold rounded-lg text-sm"
          />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Banner Section (70%) */}
        <div className="w-full lg:w-[70%]">
          <ProductImageCarousel images={banners} />
        </div>

        {/* CTA Card Section (30%) */}
        <div className="w-full lg:w-[30%] bg-[#fffbf2] border border-[#fef3d1] p-8 flex flex-col items-center justify-between rounded-2xl text-center min-h-112 shadow-sm">
          <div>
            <h4 className="text-[#1a1a3d] font-bold text-2xl mb-3">
              Sell with us
            </h4>
            <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
              Grow Your Business By Sharing Meaningful Products With A Wider
              Audience
            </p>
          </div>

          <div className="mt-8 w-full">
            <img
              src={IMAGES.becomeVendorCta}
              alt="Sell illustration"
              className="w-full max-w-60 mx-auto object-contain"
            />
          </div>
        </div>
      </div>

      <h4 className="text-neutral-90 font-bold text-xl mt-16">
        Explore Products
      </h4>
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

      <div className="grid grid-cols-5 gap-4 mt-6">
        {showSkeletons
          ? Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))
          : products.map((product: TProduct) => (
              <ProductCard key={product?._id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default VedicShop;
