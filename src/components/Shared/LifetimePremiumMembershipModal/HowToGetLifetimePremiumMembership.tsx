import Button from "../../../components/Reusable/Button/Button";
import { ICONS } from "../../../assets";

const HowToGetLifetimePremiumMembership = ({
  setContentType,
}: {
  setContentType: React.Dispatch<
    React.SetStateAction<"unlockCta" | "howToGet" | "referralOnboarding">
  >;
}) => {
  const steps = [
    {
      id: 1,
      title: "Quick Spiritual Quiz",
      description: "Learn how to unlock your discount",
      icon: ICONS.quiz,
    },
    {
      id: 2,
      title: "Video Summary",
      description: "Experience instant spiritual insights",
      icon: ICONS.videoSummary,
    },
    {
      id: 3,
      title: "Get Your Referral Code",
      description: "Invite 2 friends and unlock 30% off",
      icon: ICONS.referralCode,
    },
    {
      id: 4,
      title: "Share Your Link",
      description: "Share your unique link with your friends",
      icon: ICONS.shareLink,
    },
    {
      id: 5,
      title: "Friends Join & Register",
      description: "Your friend sign up using your link",
      icon: ICONS.userSignup,
    },
    {
      id: 6,
      title: "Unlock 30% Discount",
      description: "After 2 friends join, your discount is unlocked!",
      icon: ICONS.reward,
    },
  ];

  return (
    <div className="p-2">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-block bg-primary-10/10 px-4 py-1 rounded-full mb-2">
          <span className="text-primary-10 text-xs font-medium">
            ✨ Referral Program
          </span>
        </div>
        <h2 className="text-2xl font-bold text-neutral-90">How It Works</h2>
        <p className="text-sm text-neutral-60 mt-1">
          Complete these steps to get 30% off lifetime premium
        </p>
      </div>

      {/* Steps Grid - 2 Columns */}
      <div className="flex flex-col gap-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white border border-neutral-20 rounded-xl p-3.5 flex items-center justify-between shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div>
                <img src={step.icon} alt="" className="size-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-neutral-90 truncate">
                  {step.title}
                </h4>
                <p className="text-xs text-neutral-60 truncate">
                  {step.description}
                </p>
              </div>
            </div>

            <div className="size-8 rounded-full bg-primary-10/10 text-primary-10 flex items-center justify-center text-sm font-bold shrink-0">
              {step.id}
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <Button
          label="Start Now"
          className=""
          rightIcon={ICONS.arrowRight}
          onClick={() => {
            setContentType("referralOnboarding");
          }}
        />
        <p className="text-xs text-neutral-40">
          ✨ Start your journey today and unlock 30% off
        </p>
      </div>
    </div>
  );
};

export default HowToGetLifetimePremiumMembership;
