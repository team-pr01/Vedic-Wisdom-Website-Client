import toast from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";

const ReferralCodeStep = () => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText("VW12345");
    toast.success("Referral code copied to clipboard");
  };
  return (
    <div className="space-y-6">
      {/* Referral Code Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-neutral-90">
            Get Your Referral Code
          </h3>
          <p className="text-sm text-neutral-60 mt-0.5">
            Invite friends and unlock rewards
          </p>
        </div>
        <span className="text-xs font-medium text-primary-10 bg-primary-10/10 px-3 py-1 rounded-full">
          Step 3 of 4
        </span>
      </div>

      {/* Referral Code Display */}
      <div className="bg-linear-to-br from-primary-10/10 to-primary-10/5 border border-primary-10/20 rounded-2xl p-6 text-center">
        <p className="text-sm text-neutral-60 mb-2">
          Your Unique Referral Code
        </p>
        <div className="flex items-center justify-center gap-4">
          <span className="text-3xl font-mono font-bold text-primary-10 tracking-wider">
            VW12345
          </span>
          <button
            onClick={handleCopyCode}
            className="text-primary-10 text-lg font-bold"
          >
            <MdOutlineContentCopy />
          </button>
        </div>
      </div>

      {/* How to Use */}
      <div className="bg-white border border-neutral-20 rounded-xl p-4">
        <p className="text-sm font-medium text-neutral-90 mb-2">
          How to use your referral code:
        </p>
        <div className="space-y-1.5">
          {[
            "Share this code with your friends",
            "They use it during sign up",
            "Earn rewards when they join",
          ].map((text, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs text-neutral-60"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary-10" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferralCodeStep;
