import { IMAGES } from "../../../../../assets";
import {
  FaRocket,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaGlobe,
} from "react-icons/fa";

const SellerInstructions = () => {
  const sellerBenefits = [
    {
      id: 1,
      title: "Reach Thousands of Customers",
      description:
        "Access our growing community of spiritual seekers and wellness enthusiasts",
      icon: <FaUsers className="text-primary-10" />,
    },
    {
      id: 2,
      title: "Zero Commission on First 10 Sales",
      description: "Start selling with no commission on your first 10 orders",
      icon: <FaRocket className="text-primary-10" />,
    },
    {
      id: 3,
      title: "Boost Your Sales with AI",
      description:
        "AI-powered product recommendations and targeted marketing to increase visibility",
      icon: <FaChartLine className="text-primary-10" />,
    },
    {
      id: 4,
      title: "Direct Payments to You",
      description:
        "Customers pay you directly — no middleman, no delays. Get paid instantly",
      icon: <FaShieldAlt className="text-primary-10" />,
    },
    {
      id: 5,
      title: "Global Customer Reach",
      description:
        "Sell your products to customers worldwide with international shipping support",
      icon: <FaGlobe className="text-primary-10" />,
    },
  ];

  const howToSell = [
    {
      id: 1,
      title: "Create Your Seller Account",
      description:
        "Sign up with your business details and verify your identity",
    },
    {
      id: 2,
      title: "List Your Products",
      description:
        "Upload product images, descriptions, pricing, and inventory",
    },
    {
      id: 3,
      title: "Manage Your Store",
      description:
        "Track orders, manage inventory, and communicate with customers",
    },
    {
      id: 4,
      title: "Get Direct Payments",
      description:
        "Customers pay you directly — no middleman, 100% secure transactions",
    },
  ];

  return (
    <div className="rounded-4xl border border-primary-50 bg-neutral-65 p-6 relative overflow-hidden">
      {/* Background Gradient */}
      <img
        src={IMAGES.referBonusGradient}
        alt=""
        className="absolute bottom-0 left-0 right-0 w-full rounded-b-4xl opacity-60"
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-neutral-40 text-2xl font-bold">
            Grow your business with <br />
            <span className="text-primary-10">Vedic Wisdom</span>
          </h1>
          <p className="text-neutral-60 font-medium mt-2">
            Join thousands of trusted sellers and start reaching more customers
            today.
          </p>
        </div>

        {/* Benefits - Card Style 1: Icon with border-left accent */}
        <div className="grid grid-cols-1 gap-3 mt-6">
          {sellerBenefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex items-start gap-3 bg-white border-l-2 border-primary-10/50 rounded-r-lg px-4 py-3 hover:shadow-md transition-shadow"
            >
              <div className="mt-0.5 text-lg bg-primary-10/10 p-2 rounded-full">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-neutral-5 font-semibold text-sm">
                  {benefit.title}
                </h3>
                <p className="text-neutral-50 text-xs mt-0.5">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <hr className="flex-1 border-neutral-30" />
          <span className="text-neutral-40 text-sm font-medium whitespace-nowrap">
            How to Get Started
          </span>
          <hr className="flex-1 border-neutral-30" />
        </div>

        {/* How to Sell Steps - Card Style 2: Numbered with gradient background */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {howToSell.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-linear-to-r from-primary-10/5 to-white border border-primary-10/20 rounded-lg px-4 py-3 hover:shadow-md transition-shadow group"
            >
              <div className="bg-linear-to-r from-primary-10 to-primary-20 size-8 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-110 transition-transform">
                {item.id}
              </div>
              <div>
                <h3 className="text-neutral-5 font-semibold text-sm">
                  {item.title}
                </h3>
                <p className="text-neutral-50 text-xs mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerInstructions;
