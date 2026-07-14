import { useState } from "react";
import { ICONS, IMAGES } from "../../../assets";
import Button from "../../../components/Reusable/Button/Button";
import SelectSystemLanguage from "../../../components/Shared/SelectSystemLanguage/SelectSystemLanguage";
import CoinUsages from "../../../components/Dashboard/MyProfilePage/CoinUsages/CoinUsages";
import LifetimePremiumMembershipModal from "../../../components/Shared/LifetimePremiumMembershipModal/LifetimePremiumMembershipModal";
import DeleteAccountConfirmation from "../../../components/Dashboard/MyProfilePage/DeleteAccountConfirmation/DeleteAccountConfirmation";
import DepositCoin from "../../../components/Dashboard/MyProfilePage/DepositCoin/DepositCoin";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const [isDepositCoinModalOpen, setIsDepositCoinModalOpen] = useState(false);
  const [isTranslateNewsModalOpen, setIsTranslateNewsModalOpen] =
    useState(false);
  const [
    isDeleteAccountConfirmationModalOpen,
    setIsDeleteAccountConfirmationModalOpen,
  ] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const [isCoinUsageModalOpen, setIsCoinUsageModalOpen] =
    useState<boolean>(false);
  const statics = [
    {
      title: "Saved Audio Books",
      value: 12,
      icon: ICONS.savedAudioBook,
    },
    {
      title: "Books Saved",
      value: 20,
      icon: ICONS.savedBooks,
    },
    {
      title: "Quizzes Taken",
      value: 15,
      icon: ICONS.quizTaken,
    },
    {
      title: "Membership Plan",
      value: "Free",
      icon: ICONS.membershipPlan,
    },
  ];

  const generalLinks = [
    {
      label: "Referral List",
      path: "/dashboard/referral-list",
      icon: ICONS.referralList,
    },
    {
      label: "Language",
      onClick: () => {
        setIsTranslateNewsModalOpen(true);
      },
      icon: ICONS.language,
    },
    {
      label: "Add Coin",
      onClick: () => {
        setIsDepositCoinModalOpen(true);
      },
      icon: ICONS.addMoney,
    },
    {
      label: "Coin Usage",
      onClick: () => {
        setIsCoinUsageModalOpen(true);
      },
      icon: ICONS.howToUseCoin,
    },
    {
      label: "Subscription Plans",
      link: "/dashboard/subscription-plans",
      icon: ICONS.subscriptionPlans,
    },
    {
      label: "Privacy Policy",
      path: "/privacy-policy",
      icon: ICONS.privacyPolicy,
    },
    {
      label: "Terms and Conditions",
      path: "/terms-and-conditions",
      icon: ICONS.termsAndConditions,
    },
    {
      label: "Account Settings",
      path: "/dashboard/account-settings",
      icon: ICONS.accountSettings,
    },
  ];
  return (
    <div className="font-Manrope">
      <h2 className="heading-dashboard">My Profile</h2>

      <div className="border border-neutral-50/10 bg-neutral-30 rounded-4xl p-6 flex items-center justify-between mt-6">
        <div className="flex items-center gap-5">
          <div className="bg-white border border-primary-10 size-25 rounded-full p-1">
            <div className="size-full">
              <img src={IMAGES.dummyAvatar} alt="" className="size-full" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-neutral-40 text-lg font-bold">
                Mr. John Doe
              </h3>
              <div className="px-2 py-1 border border-neutral-20 bg-white text-xs text-neutral-40 uppercase font-semibold rounded-3xl">
                Free Plan
              </div>
            </div>
            <p className="text-neutral-50 text-sm font-medium">
              User Id : VW324
            </p>
            <p className="text-neutral-40 text-sm font-medium">
              akash@gmail.com
            </p>
          </div>
        </div>

        <Button leftIcon={ICONS.editProfile} label="Edit Profile" />
      </div>

      <hr className="border border-neutral-75/60 h-px my-6" />

      <div className="flex gap-10">
        <div className="w-[50%] space-y-4">
          <h3 className="text-neutral-90 font-bold">Statistics</h3>
          {/* Plan & Coin info */}
          <div className="p-4 border border-neutral-55 rounded-lg bg-white relative">
            <img
              src={IMAGES.gradientProfileCard}
              alt=""
              className="absolute left-0 bottom-0 top-0 h-full"
            />
            <div className="w-[60%] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="border border-neutral-50/10 bg-neutral-30 rounded-full size-8 flex items-center justify-center">
                  <img
                    src={ICONS.lifetimePremiumMembership}
                    alt=""
                    className="size-5"
                  />
                </div>
                <h3 className="text-neutral-90 font-bold">Premium Plan</h3>
              </div>
              <div className="h-16 bg-primary-80 w-px"></div>
              <div className="flex items-center gap-2">
                <div className="border border-neutral-50/10 bg-neutral-30 rounded-full size-8 flex items-center justify-center">
                  <img src={ICONS.aryaCoin} alt="" className="size-5" />
                </div>
                <div>
                  <p className="text-neutral-90 text-sm">Arya Coin</p>
                  <h3 className="text-neutral-40 font-bold">50</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Statics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {statics?.map((item) => (
              <div
                key={item?.title}
                className="flex items-start gap-3 border border-neutral-55 bg-neutral-70 rounded-lg p-4"
              >
                <img src={item?.icon} alt="" className="size-7" />
                <div>
                  <p className="text-neutral-90 text-sm">{item?.title}</p>
                  <h3 className="text-neutral-40 font-bold">{item?.value}</h3>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-neutral-90 font-bold mt-6">Plan</h3>
          <div className="relative">
            <div className="absolute inset-0 flex flex-col justify-center text-left px-6">
              <h4 className="text-white font-bold text-2xl">Get Premium</h4>
              <p className="text-white mt-2">
                Enjoy all the benefits of the app
              </p>
            </div>
            <img src={IMAGES.getPremiumBanner} alt="" className="w-full" />
          </div>
        </div>

        <div className="w-[50%] space-y-4">
          <h3 className="text-neutral-90 font-bold">General</h3>
          {generalLinks?.map((item) =>
            item?.onClick ? (
              <button
                key={item?.label}
                onClick={item.onClick}
                className="border border-neutral-55 bg-white p-4 rounded-lg flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-2.5">
                  <img src={item?.icon} alt="" className="size-6" />
                  <p className="text-sm font-bold text-neutral-90">
                    {item?.label}
                  </p>
                </div>
                <img src={ICONS.arrowRightGray} alt="" className="size-6" />
              </button>
            ) : (
              <Link
                key={item?.label}
                to={item?.link as string}
                className="border border-neutral-55 bg-white p-4 rounded-lg flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-2.5">
                  <img src={item?.icon} alt="" className="size-6" />
                  <p className="text-sm font-bold text-neutral-90">
                    {item?.label}
                  </p>
                </div>
                <img src={ICONS.arrowRightGray} alt="" className="size-6" />
              </Link>
            ),
          )}
        </div>
      </div>

      <SelectSystemLanguage
        isModalOpen={isTranslateNewsModalOpen}
        setIsModalOpen={setIsTranslateNewsModalOpen}
        setSelectedLanguage={setSelectedLanguage}
      />

      <CoinUsages
        isModalOpen={isCoinUsageModalOpen}
        setIsModalOpen={setIsCoinUsageModalOpen}
      />

      <LifetimePremiumMembershipModal />
      <DeleteAccountConfirmation
        isModalOpen={isDeleteAccountConfirmationModalOpen}
        setIsModalOpen={setIsDeleteAccountConfirmationModalOpen}
      />

      <DepositCoin
        isModalOpen={isDepositCoinModalOpen}
        setIsModalOpen={setIsDepositCoinModalOpen}
      />
    </div>
  );
};

export default MyProfile;
