import { IMAGES } from "../../../assets";
import Button from "../../../components/Reusable/Button/Button";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../../../redux/Features/User/userApi";
import AllProducts from "../../../components/Dashboard/VedicShopPage/AllProducts/AllProducts";
import ShopBanners from "../../../components/Dashboard/VedicShopPage/ShopBanners/ShopBanners";

const VedicShop = () => {
  const { data: profile } = useGetMeQuery({});
  const myProfile = profile?.data || {};

  return (
    <div className="font-Manrope">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-4 mb-6 lg:mb-8">
        <DashboardHeading
          title="Vedic Products"
          description="Discover Products That Inspire Your Spiritual Journey"
        />
        <div className="w-full sm:w-auto shrink-0">
          {myProfile?.isVendor && (
            <Link to={"/dashboard/vedic-shop/vendor/dashboard"}>
              <Button
                label="Go to Dashboard"
                className="bg-[#f2c94c] hover:bg-[#e0b83d] text-black border-none shadow-md px-6 py-3 font-semibold rounded-lg text-sm w-full sm:w-auto"
              />
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
        {/* Banner Section (70%) */}
        <div className="w-full lg:w-[70%]">
          <ShopBanners />
        </div>

        <Link
            to="/dashboard/vedic-shop/become-a-vendor"
            className="w-full flex lg:hidden"
          >
            <Button label="Become a Vendor" className="w-full" />
          </Link>

        {/* CTA Card Section (30%) — visible on all breakpoints */}
        <div className="w-full lg:w-[30%] bg-gradient-to-br from-[#fffbf2] to-[#fef3d1] border border-[#fef3d1] p-6 sm:p-7 lg:p-8 hidden lg:flex flex-col items-center justify-between rounded-2xl text-center lg:min-h-112 shadow-sm relative overflow-hidden">
          {/* Soft glow behind image */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#f2c94c]/20 blur-[60px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2c94c]/20 text-[#8a6d1f] text-xs font-semibold mb-4">
              <span className="size-1.5 rounded-full bg-[#f2c94c]" />
              Start Selling
            </div>

            <h4 className="text-[#1a1a3d] font-bold text-xl sm:text-2xl mb-2">
              Sell with us
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
              Grow your business by sharing meaningful products with a wider
              audience.
            </p>
          </div>

          <div className="relative z-10 mt-6 lg:mt-8 w-full">
            <img
              src={IMAGES.becomeVendorCta}
              alt="Sell illustration"
              className="w-full max-w-44 sm:max-w-52 lg:max-w-60 mx-auto object-contain"
            />
          </div>

          {/* Optional CTA — remove if the card should be static */}
          <Link
            to="/dashboard/vedic-shop/become-a-vendor"
            className="relative z-10 w-full mt-6"
          >
            <Button label="Become a Vendor" className="w-full" />
          </Link>
        </div>
      </div>

      <AllProducts />
    </div>
  );
};

export default VedicShop;
