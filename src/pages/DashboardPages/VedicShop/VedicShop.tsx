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
      <div className="flex items-center justify-between mb-8">
        <DashboardHeading
          title="Vedic Products"
          description="Discover Products That Inspire Your Spiritual Journey"
        />
        {myProfile?.isVendor ? (
          <Link to={"/dashboard/vedic-shop/vendor/dashboard"}>
            <Button
              label="Go to Dashboard"
              className="bg-[#f2c94c] hover:bg-[#e0b83d] text-black border-none shadow-md px-6 py-3 font-semibold rounded-lg text-sm"
            />
          </Link>
        ) : (
          <Link to={"/dashboard/vedic-shop/become-a-vendor"}>
            <Button
              label="Become a Vendor"
              className="bg-[#f2c94c] hover:bg-[#e0b83d] text-black border-none shadow-md px-6 py-3 font-semibold rounded-lg text-sm"
            />
          </Link>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Banner Section (70%) */}
        <div className="w-full lg:w-[70%]">
          <ShopBanners />
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

      <AllProducts />
    </div>
  );
};

export default VedicShop;
