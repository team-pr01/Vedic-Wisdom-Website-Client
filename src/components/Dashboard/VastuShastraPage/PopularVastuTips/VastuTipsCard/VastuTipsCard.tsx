import { ICONS } from "../../../../../assets";
import type { TVastuTips } from "../../../../../types/vastuTips.type";

const VastuTipsCard = ({ vastuTips }: { vastuTips: TVastuTips }) => {
  return (
    <div className="p-6 bg-white border border-neutral-20 rounded-2xl">
      <div className="flex items-center gap-3">
        <h4 className="text-neutral-90 font-bold text-lg">
          {vastuTips?.title}
        </h4>
        <span className="text-xs bg-primary-10/10 text-primary-10 px-2 py-0.5 rounded-full capitalize">
          {vastuTips?.category}
        </span>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        {vastuTips?.tips?.map((tips) => (
          <div className="flex gap-2">
            <img src={ICONS.checkMark} alt="" className="size-5" />
            <p className="text-neutral-10 text-sm font-medium">{tips}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VastuTipsCard;
