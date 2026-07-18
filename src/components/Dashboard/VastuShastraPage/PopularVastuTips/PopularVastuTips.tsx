import { useGetAllVastuTipsQuery } from "../../../../redux/Features/Vastu/vastuTipsApi";
import type { TVastuTips } from "../../../../types/vastuTips.type";
import VastuTipsCardSkeleton from "../../../SkeletonLoaders/VastuTipsCardSkeleton/VastuTipsCardSkeleton";
import VastuTipsCard from "./VastuTipsCard/VastuTipsCard";

const PopularVastuTips = () => {
  const { data, isLoading } = useGetAllVastuTipsQuery({});
  const vastuTips = data?.data?.vastuTips || [];
  return (
    <div className="font-Manrope">
      <h4 className="text-neutral-90 font-bold text-xl">Popular Vastu Tips</h4>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-5">
          {[1, 2, 3]?.map((_, index) => (
            <VastuTipsCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 mt-6">
          {vastuTips.map((vastuTips: TVastuTips) => (
            <VastuTipsCard key={vastuTips?._id} vastuTips={vastuTips} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularVastuTips;
