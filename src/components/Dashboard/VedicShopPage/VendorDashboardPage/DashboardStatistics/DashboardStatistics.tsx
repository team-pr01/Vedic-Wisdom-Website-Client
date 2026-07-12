import { FaBox, FaCheckCircle, FaClock, FaEye } from "react-icons/fa";
import { ICONS, IMAGES } from "../../../../../assets";
import Button from "../../../../Reusable/Button/Button";
import { Link } from "react-router-dom";

const DashboardStatistics = () => {
  const stats = [
    {
      id: 1,
      title: "Total Products",
      value: "12",
      icon: <FaBox className="text-primary-10" />,
      change: "+2 this month",
      changeType: "positive",
    },
    {
      id: 2,
      title: "Approved Products",
      value: "8",
      icon: <FaCheckCircle className="text-green-500" />,
      change: "80% approved",
      changeType: "positive",
    },
    {
      id: 3,
      title: "Pending Products",
      value: "4",
      icon: <FaClock className="text-yellow-500" />,
      change: "Waiting for review",
      changeType: "neutral",
    },
    {
      id: 4,
      title: "Total Clicks",
      value: "9",
      icon: <FaEye className="text-blue-500" />,
      change: "+3 this week",
      changeType: "positive",
    },
  ];
  return (
    <div className="flex gap-8 mt-8">
      {/* Left side banner */}
      <div className="relative rounded-2xl overflow-hidden w-[70%]">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={IMAGES.startSelling}
            alt="Books Banner"
            className="w-full h-full"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-8 md:px-12 lg:px-16 py-16 md:py-20 max-w-2xl text-center w-full mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Start Selling
            <br />
            <span className="text-primary-10">Start Earning</span>
          </h1>

          {/* Description */}
          <p className="text-white/80 text-sm md:text-base mt-4 max-w-lg leading-relaxed">
            Set up your store in minutes, manage orders easily, and start
            earning from every sale
          </p>
        </div>
      </div>

      {/* Right side stats */}
      <div className="space-y-6 w-[30%]">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl border border-neutral-20 p-5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-40">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-neutral-90 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary-10/10 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-3">
                <span
                  className={`text-xs font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-neutral-40"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Product Button */}
        <div className="flex justify-end">
          <Link to={`/dashboard/vedic-shop/vendor/add-product`} className="w-full">
          <Button
            label="Add New Product"
            className="w-full"
            rightIcon={ICONS.plus}
          />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatistics;
