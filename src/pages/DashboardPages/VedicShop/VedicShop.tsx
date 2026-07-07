import {IMAGES } from "../../../assets";
import Button from "../../../components/Reusable/Button/Button";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import ProductCard from "../../../components/Dashboard/VedicShopPage/ProductCard/ProductCard";
import ProductImageCarousel from "../../../components/Reusable/ProductImageCarousel/ProductImageCarousel";

const VedicShop = () => {
  const banners = [
    IMAGES.dummyShopBanner,
    IMAGES.dummyShopBanner,
    IMAGES.dummyShopBanner,
    IMAGES.dummyShopBanner,
  ];

  return (
    <div className="font-Manrope px-4 py-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <DashboardHeading
          title="Shop"
          description="Discover Products That Inspire Your Spiritual Journey"
        />
        <Button
          label="Become a vendor"
          className="bg-[#f2c94c] hover:bg-[#e0b83d] text-black border-none shadow-md px-6 py-3 font-semibold rounded-lg text-sm"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Banner Section (70%) */}
        <div className="w-full lg:w-[70%]">
          <div className="w-full lg:w-[40%]">
          <ProductImageCarousel images={banners} />
        </div>
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
              className="w-full max-w-[240px] mx-auto object-contain"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-16">
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
