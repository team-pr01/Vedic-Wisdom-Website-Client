import { ICONS } from "../../../../assets";
import type { TVastu } from "../../../../types/vastu.type";
import Button from "../../../Reusable/Button/Button";

const VastuShastraVideoCard = ({ vastu }: { vastu: TVastu }) => {
  return (
    <div className="rounded-2xl relative shadow-food-card w-fit border border-primary-80/60 bg-white">
      <div className="relative aspect-video bg-black/5 h-48 rounded-t-2xl">
        <iframe
          src={vastu?.videoUrl}
          title={vastu?.title}
          className="w-full h-full rounded-t-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {vastu.duration}
        </span>
      </div>

      <div className="p-5">
        <h4 className="text-neutral-90 font-bold">{vastu?.title}</h4>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-2 ">
            <img src={ICONS.time} alt="" className="size-4 text-lg" />
            <p className="text-neutral-50 text-sm">{vastu?.duration}</p>
          </div>
          <div className="flex items-center gap-2 ">
            <img src={ICONS.category} alt="" className="size-4" />
            <p className="text-neutral-50 text-sm">{vastu?.category}</p>
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
