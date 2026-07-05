import { ICONS } from "../../../../../assets";

const VastuTipsCard = () => {
  return (
    <div className="p-6 bg-white border border-neutral-20 rounded-2xl">
      <div className="flex items-center gap-3">
        <div className="bg-primary-50 flex items-center justify-center rounded-xl p-2 size-9">
          <img src={ICONS.bedroomVastu} alt="" className="size-4" />
        </div>
        <h4 className="text-neutral-90 font-bold">Bedroom Vastu Tips</h4>
      </div>

      <div className="flex gap-2 mt-5">
        <img src={ICONS.checkMark} alt="" className="size-5" />
        <p className="text-neutral-10 text-sm font-medium">
          Always keep the bed in the south-west corner for better sleep and
          stability.
        </p>
      </div>
    </div>
  );
};

export default VastuTipsCard;
