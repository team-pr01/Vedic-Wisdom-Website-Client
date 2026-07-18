import { ICONS } from "../../../../assets";
import type { TFood } from "../../../../types/food.type";
import Button from "../../../Reusable/Button/Button";

const FoodCard = ({ recipe }: { recipe: TFood }) => {
  return (
    <div className="rounded-2xl relative shadow-food-card w-fit border border-primary-80/60 bg-white">
      <div className="relative aspect-video bg-black/5 h-56 rounded-t-2xl">
        <iframe
          src={recipe?.videoUrl}
          title={recipe?.title}
          className="w-full h-full rounded-t-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h4 className="text-neutral-90 font-bold w-[80%]">{recipe?.title}</h4>
          <div className="px-2 py-1 rounded bg-primary-50 text-neutral-5 text-xs font-bold text-center">
            <span>{recipe?.category}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <img src={ICONS.time} alt="" />
          <p className="text-neutral-50 text-sm">{recipe?.duration}</p>
        </div>

        <a href={recipe?.videoUrl} target="_blank">
          <Button
            variant="secondary"
            label="Watch Video"
            className="mt-3 w-full"
          />
        </a>
      </div>
    </div>
  );
};

export default FoodCard;
