import { useState } from "react";
import Badge from "../../Reusable/Badge/Badge";
import {
  subscriptionPlans,
  type TPricingPlan,
} from "../../../data/subscriptionData";
import PricingCard from "./PricingCard";
import DiscountCTA from "../../Shared/DiscountCTA/DiscountCTA";

const SubscriptionPricing = () => {
  const tabButtons = ["Monthly", "Yearly"];
  const [selectedTab, setSelectedTab] = useState<"Monthly" | "Yearly">(
    "Yearly",
  );

  return (
    <div className="font-Manrope">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-5">
          <Badge label="Simple Pricing" />
          <h1 className="heading">
            Start Your <span className="text-primary-10">Vedic</span> <br />
            Spiritual <span className="text-primary-10">Journey.</span>
          </h1>
        </div>

        <div>
          <p className="text-neutral-10 text-sm max-w-100">
            Begin your spiritual journey at no cost. Upgrade to Premium for the
            full experience — no commitment, cancel anytime.
          </p>

          <div className="p-2 border border-neutral-20 bg-primary-50 rounded-2xl mt-4 flex items-center gap-3 w-fit">
            {tabButtons?.map((item) => (
              <button
                onClick={() => setSelectedTab(item as "Monthly" | "Yearly")}
                key={item}
                className={`px-4 py-2 text-neutral-10 font-bold text-lg rounded-lg flex items-center gap-3 ${
                  selectedTab === item
                    ? "bg-gradient-primary-button shadow-button"
                    : "bg-none shadow-none"
                }`}
              >
                {item}
                {item === "Yearly" && (
                  <div className="bg-white rounded-3xl px-2 py-1 text-sm">
                    Save 30%
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-15 items-end mb-15">
        {subscriptionPlans?.map((plan: TPricingPlan) => (
          <PricingCard
            key={plan?.title}
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