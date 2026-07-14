import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";

const UnlockCTA = ({
  setContentType,
}: {
  setContentType: React.Dispatch<
    React.SetStateAction<"unlockCta" | "howToGet" | "referralOnboarding">
  >;
}) => {
  return (
    <div>
      <img src={IMAGES.discountBox} alt="" className="w-1/2 mx-auto" />

      <h2 className="text-neutral-90 text-2xl font-bold mt-6 text-center">
        Unlock 30% Premium Discount
      </h2>
      <p className="text-sm text-neutral-50 font-medium mt-2 max-w-sm text-center">
        Invite just 2 friends and activate your exclusive Premium benefit
      </p>

      <Button
        leftIcon={ICONS.unlock}
        label="Unlock Now"
        className="w-full mt-6"
        onClick={() => setContentType("howToGet")}
      />
    </div>
  );
};

export default UnlockCTA;
