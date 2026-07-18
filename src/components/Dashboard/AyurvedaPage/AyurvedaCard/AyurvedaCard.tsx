import { ICONS } from "../../../../assets";
import type { TAyurveda } from "../../../../types/ayurveda.type";

const AyurvedaCard = ({ ayurveda }: { ayurveda: TAyurveda }) => {
  return (
    <div className="rounded-2xl relative shadow-food-card border border-primary-80/60 bg-white p-3 space-y-3">
      <div className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 aspect-video w-full h-56">
        <iframe
          className="w-full h-full"
          src={ayurveda?.videoUrl}
          title={ayurveda?.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h4 className="text-neutral-90 font-bold">{ayurveda?.title}</h4>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <img src={ICONS.time} alt="" className="size-4" />
          <p className="text-neutral-50 text-sm">{ayurveda?.duration}</p>
        </div>
        <div className="flex items-center gap-1">
          <img src={ICONS.category} alt="" className="size-3.5" />
          <p className="text-neutral-50 text-sm capitalize">
            {ayurveda?.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AyurvedaCard;
