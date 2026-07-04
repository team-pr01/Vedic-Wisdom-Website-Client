import { ICONS, IMAGES } from "../../../assets";
import { appDownloadLinks } from "../../../data/appDownloadLinks";
import Button from "../../Reusable/Button/Button";

const DiscountCTA = () => {
  const howReferralWorks = [
    {
      id: 1,
      title: "Quick Spiritual Quiz",
      description: "Learn how to unlock your discount",
    },
    {
      id: 2,
      title: "AI Video Summary",
      description: "Experience instant spiritual insights",
    },
    {
      id: 3,
      title: "Get Your Referral Code",
      description: "Invite 2 friends and unlock 30% off",
    },
  ];
  return (
    <div className="rounded-4xl border border-primary-50 bg-neutral-65 p-10 flex items-center justify-between gap-10 max-w-6xl mx-auto relative shadow-hero-user-community-box">
      <div className="w-[60%]">
        <div className="flex items-center gap-5">
          <img src={IMAGES.gift} alt="" />

          <div>
            <h1 className="text-neutral-40 text-[50px] font-semibold leading-13">
              Unlock <span className="text-primary-10">30%</span> <br />
              Premium <span className="text-primary-10">Discount.</span>
            </h1>
            <p className="text-neutral-60 text-lg font-medium mt-4">
              Invite 2 Friends & Unlock 30% Premium Discount.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-neutral-50">Download the app</p>
          <div className="flex items-center gap-5 mt-5">
            {appDownloadLinks?.map((link, index) => (
              <a
                key={index}
                href={link?.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={link?.image} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[40%] space-y-4">
        <div className="rounded-lg border border-neutral-55 bg-neutral-70 p-4 space-y-3">
          {howReferralWorks?.map((item) => (
            <div
              key={item?.id}
              className="flex items-center gap-3 bg-white border border-neutral-50/20 rounded-lg px-3 py-2"
            >
              <div className="bg-primary-10 size-6 rounded-full text-white flex items-center justify-center">
                {item?.id}
              </div>
              <div>
                <h3 className="text-neutral-5 font-semibold">{item?.title}</h3>
                <p className="text-neutral-50 text-sm mt-0.5">
                  {item?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          label="Start Now"
          className="text-sm w-full"
          rightIcon={ICONS.arrowRight}
        />
      </div>

      <img
        src={IMAGES.referBonusGradient}
        alt=""
        className="absolute bottom-0 left-0 right-0 w-full rounded-b-4xl"
      />
    </div>
  );
};

export default DiscountCTA;
