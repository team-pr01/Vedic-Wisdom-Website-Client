import { ICONS, IMAGES } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";

const FoodCard = () => {
  return (
    <div className="rounded-2xl relative shadow-food-card w-fit border border-primary-80/60 bg-white">
      <img
        src={IMAGES.dummyPrasad}
        alt=""
        className="rounded-t-2xl h-56 object-cover"
      />
      <div className="px-2 py-1 rounded bg-primary-50 text-neutral-5 text-xs font-bold absolute top-4 left-4 text-center">
        <span>PRASAD</span>
      </div>

      <div className="p-5">
        <h4 className="text-neutral-90 font-bold">Ayurvedic Khichadi</h4>

        <div className="flex items-center gap-2 mt-2">
          <img src={ICONS.time} alt="" />
          <p className="text-neutral-50 text-sm">12:45 min</p>
        </div>

        <Button
          variant="secondary"
          label="Watch Video"
          className="mt-3 w-full"
        />
      </div>
    </div>
  );
};

export default FoodCard;
