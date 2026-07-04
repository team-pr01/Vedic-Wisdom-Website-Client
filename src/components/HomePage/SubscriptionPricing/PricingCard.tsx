import { ICONS } from "../../../assets";
import type {
  subscriptionPlans,
  TPricingPlan,
} from "../../../data/subscriptionData";
import Button from "../../Reusable/Button/Button";

const PricingCard = ({
  plan,
  selectedTab,
}: {
  plan: TPricingPlan;
  selectedTab: "Monthly" | "Yearly";
}) => {
  const getPrice = (plan: (typeof subscriptionPlans)[0]) => {
    return selectedTab === "Monthly" ? plan.price.monthly : plan.price.yearly;
  };

  // Helper to get period text
  const getPeriod = () => {
    return selectedTab === "Monthly" ? "month" : "year";
  };
  return (
    <div
      className={`rounded-2xl border ${
        plan?.isPopular ? "border-primary-20" : "border-neutral-55"
      } bg-white p-6 relative h-fit  ${plan?.isPopular ? "shadow-lg" : ""}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-neutral-10 text-3xl font-bold">{plan?.title}</h2>
        {plan?.icon && (
          <img src={plan?.icon} alt={plan?.title} className="size-10" />
        )}
      </div>
      <p className="text-neutral-60 text-lg font-medium mt-2">
        {plan?.description}
      </p>

      <div className="flex items-center justify-between mt-5">
        <h2 className="text-neutral-10 text-[34px] font-bold flex items-end gap-1 leading-none">
          ${getPrice(plan)}
          <span className="text-sm font-normal text-neutral-10/70 -mb-1">
            /{getPeriod()}
          </span>
        </h2>
        {plan?.isPopular && (
          <div className="px-3 py-1 bg-primary-10 rounded-3xl text-white text-center font-medium w-fit text-sm">
            Most Popular
          </div>
        )}
      </div>

      <div className="space-y-3 mt-6">
        {plan?.features.map((feature) => (
          <div key={feature.id} className="flex items-center gap-2">
            <img src={ICONS.checkMark} alt="" className="size-5" />
            <p className="text-neutral-10 text-sm font-medium">
              {feature.text}
            </p>
          </div>
        ))}
      </div>

      {plan?.isPopular ? (
        <Button label="Get Started" className="w-full mt-8 py-2" />
      ) : (
        <Button
          variant="secondary"
          label="Get Started"
          className="w-full mt-8 py-2"
        />
      )}
    </div>
  );
};

export default PricingCard;
