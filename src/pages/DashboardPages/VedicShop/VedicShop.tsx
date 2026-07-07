/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGES } from "../../../assets";
import Button from "../../../components/Reusable/Button/Button";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import ProductCard from "../../../components/Dashboard/VedicShopPage/ProductCard/ProductCard";
import ProductImageCarousel from "../../../components/Reusable/ProductImageCarousel/ProductImageCarousel";
import { Link } from "react-router-dom";
import FilterDropdown from "../../../components/Dashboard/SanathanSthalPage/Filters/FilterDropdown";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const VedicShop = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const banners = [
    IMAGES.dummyShopBanner,
    IMAGES.dummyShopBanner,
    IMAGES.dummyShopBanner,
    IMAGES.dummyShopBanner,
  ];

  const categoryOptions = [
    { label: "All Temples", value: "all" },
    { label: "Ganesh Temple", value: "ganesh" },
    { label: "Durga Temple", value: "durga" },
    { label: "Shiva Temple", value: "shiva" },
    { label: "Vishnu Temple", value: "vishnu" },
    { label: "Krishna Temple", value: "krishna" },
    { label: "Hanuman Temple", value: "hanuman" },
    { label: "Saraswati Temple", value: "saraswati" },
    { label: "Lakshmi Temple", value: "lakshmi" },
    { label: "Kali Temple", value: "kali" },
    { label: "Ram Temple", value: "ram" },
    { label: "Sita Temple", value: "sita" },
    { label: "Radha Krishna Temple", value: "radha-krishna" },
    { label: "Jagannath Temple", value: "jagannath" },
    { label: "Venkateswara Temple", value: "venkateswara" },
    { label: "Murugan Temple", value: "murugan" },
    { label: "Ayyappa Temple", value: "ayyappa" },
    { label: "Sai Baba Temple", value: "sai-baba" },
    { label: "Mata Temple", value: "mata" },
    { label: "Navagraha Temple", value: "navagraha" },
    { label: "Panchayatana Temple", value: "panchayatana" },
    { label: "Ashram", value: "ashram" },
    { label: "Gurudwara", value: "gurudwara" },
  ];

  const handleCategorySelect = (selected: any) => {
    setCategory(selected);
  };

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
        <div className="w-full lg:w-[30%] bg-[#fffbf2] border border-[#fef3d1] p-8 flex flex-col items-center justify-between rounded-2xl text-center min-h-[450px] shadow-sm">
          <div>
            <h4 className="text-[#1a1a3d] font-bold text-3xl mb-4">
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

      <div className="grid grid-cols-5 gap-4 mt-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default VedicShop;
