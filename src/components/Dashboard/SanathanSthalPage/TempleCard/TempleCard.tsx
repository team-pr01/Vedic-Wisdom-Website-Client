import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import type { TTemple } from "../../../../types/temple.type";
import Button from "../../../Reusable/Button/Button";

const TempleCard = ({ temple }: { temple: TTemple }) => {
  return (
    <div className="rounded-xl border border-primary-80 p-3 bg-white">
      <img
        src={temple?.media?.imageUrls[0]}
        alt=""
        className="rounded-xl w-full h-56 object-cover"
      />
      <h4 className="text-neutral-90 font-bold mt-3">
        {temple?.basicInfo?.templeName}
      </h4>
      <p className="description mt-1">
        {temple?.basicInfo?.description?.slice(0, 80)}
        {temple?.basicInfo?.description?.length > 80 && "..."}
      </p>

      <div className="flex items-center gap-3 mt-3">
        <div className="flex items-center gap-2">
          <img src={ICONS.location} alt="" />
          <p className="text-neutral-50 text-sm">
            {temple?.location?.city}, {temple?.location?.country}
          </p>
        </div>
        <div className="px-2 py-1 rounded bg-primary-50 text-primary-10 text-xs text-center">
          <span>{temple?.category}</span>
        </div>
      </div>

      <Link to={`/dashboard/sanatan-sthal/${temple?._id}`}>
        <Button
          variant="secondary"
          label="View Details"
          className="mt-4 w-full"
        />
      </Link>
    </div>
  );
};

export default TempleCard;
