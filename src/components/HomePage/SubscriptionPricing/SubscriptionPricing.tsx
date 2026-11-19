import { useState } from "react";
import Badge from "../../Reusable/Badge/Badge";
import PricingCard from "./PricingCard";
import DiscountCTA from "../../Shared/DiscountCTA/DiscountCTA";
import { useGetAllActiveSubscriptionPlansQuery } from "../../../redux/Features/Subscription/suvscriptionPlanApi";
import type { TSubscriptionPlan } from "../../../types/subscriptionPlan.type";
import SubscriptionPlanCardSkeleton from "../../SkeletonLoaders/SubscriptionPlanCardSkeleton/SubscriptionPlanCardSkeleton";
import { useGetMySubscriptionQuery } from "../../../redux/Features/Subscription/subscriptionApi";

const SubscriptionPricing = () => {
  const tabButtons = ["monthly", "yearly"];
  const [selectedTab, setSelectedTab] = useState<"monthly" | "yearly">(
    "yearly",
  );

  const { data: mySubscription } = useGetMySubscriptionQuery({});
  console.log(mySubscription);

  const { data, isLoading } = useGetAllActiveSubscriptionPlansQuery({
    limit: 1000,
  });
  const plans = data?.data?.plans || [];

  return (
    <div className="font-Manrope">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
        <div className="space-y-4 lg:space-y-5">
          <Badge label="Simple Pricing" />
          <h1 className="heading">
            Start Your <span className="text-primary-10">Vedic</span> <br />
            Spiritual <span className="text-primary-10">Journey.</span>
          </h1>
        </div>

        <div className="w-full lg:w-auto">
          <p className="text-neutral-10 text-sm max-w-full lg:max-w-100">
            Begin your spiritual journey at no cost. Upgrade to Premium for the
            full experience — no commitment, cancel anytime.
          </p>

          <div className="p-2 border border-neutral-20 bg-primary-50 rounded-2xl mt-4 flex items-center gap-2 sm:gap-3 w-fit max-w-full overflow-x-auto">
            {tabButtons?.map((item) => (
              <button
                onClick={() => setSelectedTab(item as "monthly" | "yearly")}
                key={item}
                className={`px-3 sm:px-4 py-2 text-neutral-10 font-bold text-base sm:text-lg rounded-lg flex items-center gap-2 sm:gap-3 capitalize whitespace-nowrap ${
                  selectedTab === item
                    ? "bg-gradient-primary-button shadow-button"
                    : "bg-none shadow-none"
                }`}
              >
                {item}
                {item === "yearly" && (
                  <div className="bg-white rounded-3xl px-2 py-1 text-xs sm:text-sm">
                    Save 30%
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 lg:mt-15 items-end mb-10 lg:mb-15">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <SubscriptionPlanCardSkeleton key={`skeleton-${index}`} />
            ))
          : plans?.map((plan: TSubscriptionPlan) => (
              <PricingCard
                key={plan?._id}
                plan={plan}
                selectedTab={selectedTab}
              />
            ))}
      </div>

      <DiscountCTA />
    </div>
  );
};

export default SubscriptionPricing;