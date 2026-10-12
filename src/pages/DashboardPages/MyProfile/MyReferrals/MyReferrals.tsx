import { useState } from "react";
import {
  FaCopy,
  FaCheck,
  FaUser,
  FaEnvelope,
  FaShare,
  FaUsers,
  FaTrophy,
} from "react-icons/fa";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import { useGetMyReferralsQuery } from "../../../../redux/Features/Referral/referralApi";
import { useSearchParams } from "react-router-dom";
import ReferralCardSkeleton from "../../../../components/SkeletonLoaders/ReferralCardSkeleton/ReferralCardSkeleton";

type TReferredUser = {
  _id: string;
  name: string;
  email: string;
  referralCode?: string | null;
  profilePicture?: string;
};

type TReferral = {
  _id: string;
  referrer: string;
  referredUser: TReferredUser;
  rank: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

// ✅ Referral Code Skeleton (for the top card)
const ReferralCodeSkeleton = () => {
  return (
    <div className="mt-6 bg-linear-to-br from-primary-10/5 to-primary-10/10 border border-primary-10/20 rounded-2xl p-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary-10/20 p-3 rounded-xl w-11 h-11" />
          <div className="space-y-2">
            <div className="h-3 w-24 bg-neutral-20 rounded" />
            <div className="h-7 w-40 bg-neutral-20 rounded" />
          </div>
        </div>
        <div className="h-11 w-28 bg-neutral-20 rounded-xl" />
      </div>
    </div>
  );
};

const MyReferrals = () => {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("referralCode");

  // ✅ Get isLoading from the query
  const { data, isLoading } = useGetMyReferralsQuery({});

  const referrals: TReferral[] = data?.data || [];
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const myReferralCode = referralCode || "";

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (rank === 2) return "bg-gray-100 text-gray-700 border-gray-200";
    if (rank === 3) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-primary-10/10 text-primary-10 border-primary-10/20";
  };

  return (
    <div className="font-Manrope max-w-3xl mx-auto">
      <DashboardHeading
        title="My Referrals"
        description="Share your referral code and track your referrals"
      />

      {/* Your Referral Code */}
      {isLoading ? (
        <ReferralCodeSkeleton />
      ) : (
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
                {referrals?.length}
              </span>
              <span className="text-xs text-neutral-60">Referrals</span>
            </div>
          </div>
        </div>
      )}

      {/* Referral List */}
      <div className="space-y-2 mt-6">
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <ReferralCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {referrals.map((referral) => (
              <div
                key={referral._id}
                className="bg-white border border-neutral-20 rounded-xl p-3.5 flex items-center justify-between hover:shadow-sm transition-shadow duration-300"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-semibold ${getRankBadge(
                      referral.rank,
                    )}`}
                  >
                    {referral.rank <= 3 ? (
                      <FaTrophy className="text-xs" />
                    ) : (
                      referral.rank
                    )}
                  </div>

                  <img
                    src={
                      referral.referredUser?.profilePicture ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        referral.referredUser?.name || "User",
                      )}&size=128&background=F2E4C9&color=785A00`
                    }
                    alt={referral.referredUser?.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary-10/20"
                  />

                  <div>
                    <h3 className="text-neutral-90 font-medium text-sm">
                      {referral.referredUser?.name}
                    </h3>
                    <p className="text-xs text-neutral-60 flex items-center gap-1">
                      <FaEnvelope className="text-primary-10 text-[10px]" />
                      {referral.referredUser?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-10/10 rounded-lg border border-primary-10/20">
                    <FaTrophy className="text-primary-10 text-xs" />
                    <span className="text-xs font-semibold text-primary-10">
                      Rank #{referral.rank}
                    </span>
                  </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default MyReferrals;
