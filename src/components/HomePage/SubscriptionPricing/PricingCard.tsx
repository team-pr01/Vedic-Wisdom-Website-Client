/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { ICONS } from "../../../assets";
import { useInitiateSubscriptionPaymentMutation } from "../../../redux/Features/Subscription/subscriptionApi";
import Button from "../../Reusable/Button/Button";
import type { TSubscriptionPlan } from "../../../types/subscriptionPlan.type";

const PricingCard = ({
  plan,
  selectedTab,
}: {
  plan: TSubscriptionPlan;
  selectedTab: "monthly" | "yearly";
}) => {
  const getPrice = (plan: TSubscriptionPlan) => {
    return selectedTab === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getIcon = () => {
    return plan?.name === "Basic Plan"
      ? ICONS.basicPlan
      : plan?.name === "Premium Monthly"
        ? ICONS.basicPlan
        : ICONS.proPlan;
  };

  // Helper to get period text
  const getPeriod = () => {
    return selectedTab === "monthly" ? "month" : "year";
  };

  const [initiateSubscriptionPayment, { isLoading }] = useInitiateSubscriptionPaymentMutation();

  const handleInitiateSubscriptionPayment = async () => {
    try {
      const payload = {
        planId: plan._id,
        billingType: selectedTab,
      };
      const response = await initiateSubscriptionPayment(payload).unwrap();

      if (response?.success) {
        if (response?.data?.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          toast.error("Payment URL not received");
        }
      } else {
        toast.error(response?.message || "Failed to initiate payment");
      }
    } catch (error: any) {
      console.error("Payment failed:", error);
      toast.error(error?.data?.message || "Payment initiation failed");
    }
  };

  return (
    <div
      className={`rounded-2xl border ${
        plan?.isPopular ? "border-primary-20" : "border-neutral-55"
      } bg-white p-6 relative h-fit  ${plan?.isPopular ? "shadow-lg" : ""}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-neutral-10 text-3xl font-bold">{plan?.name}</h2>
      
          <img src={getIcon()} alt={plan?.name} className="size-10" />
        
      </div>
      <p className="text-neutral-60 text-lg font-medium mt-2">
        {plan?.description}
      </p>

      <div className="flex items-center justify-between mt-5">
        <h2 className="text-neutral-10 text-[34px] font-bold flex items-end gap-1 leading-none">
          {plan?.currency}
          {getPrice(plan)}
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
        {plan?.features.map((feature: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <img src={ICONS.checkMark} alt="" className="size-5" />
            <p className="text-neutral-10 text-sm font-medium">{feature}</p>
          </div>
        ))}
      </div>

      {plan?.isPopular ? (
        <Button label="Get Started" className="w-full mt-8 py-2" onClick={handleInitiateSubscriptionPayment}
          isLoading={isLoading} />
      ) : (
        <Button
          variant="secondary"
          label="Get Started"
          className="w-full mt-8 py-2"
          onClick={handleInitiateSubscriptionPayment}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default PricingCard;
