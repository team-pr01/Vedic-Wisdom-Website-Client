import Button from "../../../../../Reusable/Button/Button";
import { IMAGES } from "../../../../../../assets";

const SuccessStep = () => {
  return (
    <div className="flex flex-col items-center text-center py-3">
      <img src={IMAGES.successTick} alt="Success" className="w-20 h-20" />
      <h2 className="text-neutral-90 text-2xl font-bold mt-6">
        Job Posted Successfully
      </h2>
      <p className="text-sm text-neutral-50 font-medium mt-2 max-w-sm">
        Your job is under admin review. You will be notified once
        approved.
      </p>
      <Button label="View Posted Jobs" className="mt-6 px-8" />
    </div>
  );
};

export default SuccessStep;
