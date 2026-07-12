import { useState } from "react";
import {
  FaCopy,
  FaCheck,
  FaUser,
  FaEnvelope,
  FaShare,
  FaUsers,
} from "react-icons/fa";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";

const MyReferrals = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const myReferralCode = "VW12345";

  const referrals = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      image:
        "https://images.unsplash.com/photo-1494790108373-be9c55b6ee48?w=100",
      referralCode: "VW12343",
    },
    {
      id: 2,
      name: "Arjun Singh",
      email: "arjun.singh@email.com",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      referralCode: "VW67890",
    },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="font-Manrope max-w-3xl mx-auto">
      <DashboardHeading
        title="My Referrals"
        description="Share your referral code and track your referrals"
      />

      {/* Your Referral Code */}
      <div className="mt-6 bg-linear-to-br from-primary-10/5 to-primary-10/10 border border-primary-10/20 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary-10/20 p-3 rounded-xl">
              <FaShare className="text-primary-10 text-lg" />
            </div>
            <div>
              <p className="text-xs text-neutral-60 font-medium">
                Share this code
              </p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-2xl font-mono font-bold text-primary-10 tracking-wider">
                  {myReferralCode}
                </span>
                <button
                  onClick={() => handleCopyCode(myReferralCode)}
                  className="flex items-center gap-1.5 text-xs text-primary-10 hover:text-primary-20 transition-colors"
                >
                  {copiedCode === myReferralCode ? (
                    <>
                      <FaCheck className="text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="text-sm" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl border border-neutral-20">
            <FaUsers className="text-primary-10" />
            <span className="text-lg font-bold text-neutral-90">
              {referrals.length}
            </span>
            <span className="text-xs text-neutral-60">Referrals</span>
          </div>
        </div>
      </div>

      {/* Referral List */}
      <div className="space-y-2 mt-6">
        {referrals.map((referral, index) => (
          <div
            key={referral.id}
            className="bg-white border border-neutral-20 rounded-xl p-3.5 flex items-center justify-between hover:shadow-sm transition-shadow duration-300"
          >
            <div className="flex items-center gap-3">
              {/* Position Number */}
              <div className="w-6 h-6 rounded-full bg-primary-10/10 text-primary-10 flex items-center justify-center text-xs font-semibold">
                {index + 1}
              </div>
              <img
                src={referral.image}
                alt={referral.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary-10/20"
              />
              <div>
                <h3 className="text-neutral-90 font-medium text-sm">
                  {referral.name}
                </h3>
                <p className="text-xs text-neutral-60 flex items-center gap-1">
                  <FaEnvelope className="text-primary-10 text-[10px]" />
                  {referral.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-neutral-10/5 rounded-lg px-3 py-1.5 border border-neutral-20">
              <span className="text-xs font-mono font-medium text-neutral-90">
                {referral.referralCode}
              </span>
            </div>
          </div>
        ))}

        {referrals.length === 0 && (
          <div className="text-center py-12 bg-white border border-neutral-20 rounded-2xl">
            <FaUser className="text-neutral-30 text-4xl mx-auto mb-3" />
            <p className="text-neutral-60 font-medium">No referrals yet</p>
            <p className="text-sm text-neutral-40 mt-1">
              Share your referral code to start earning rewards
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReferrals;
