import { ICONS, IMAGES } from "../../../../../assets";
import Button from "../../../../Reusable/Button/Button";

const VastuShastraVideoCard = () => {
  return (
    <div className="rounded-2xl relative shadow-food-card w-fit border border-primary-80/60 bg-white">
      <img
        src={IMAGES.dummyVastu}
        alt=""
        className="rounded-t-2xl h-48 object-cover"
      />

      <div className="p-5">
        <h4 className="text-neutral-90 font-bold">
          Energizing Your Living Room for Prosperity
        </h4>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-2 ">
            <img src={ICONS.time} alt="" className="size-4 text-lg" />
            <p className="text-neutral-50 text-sm">12:45 min</p>
          </div>
          <div className="flex items-center gap-2 ">
            <img src={ICONS.category} alt="" className="size-4" />
            <p className="text-neutral-50 text-sm">Living Room</p>
          </div>
        </div>

        <Button
          variant="secondary"
          label="Watch Video"
          className="mt-4 w-full"
        />
      </div>
    </div>
  );
};

export default VastuShastraVideoCard;
