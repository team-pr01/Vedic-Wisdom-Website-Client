import VastuTipsCard from "./VastuTipsCard/VastuTipsCard";

const PopularVastuTips = () => {
  return (
    <div className="font-Manrope">
      <h4 className="text-neutral-90 font-bold text-xl">Popular Vastu Tips</h4>

      <div className="grid grid-cols-3 gap-5 mt-6">
        <VastuTipsCard />
        <VastuTipsCard />
        <VastuTipsCard />
        <VastuTipsCard />
      </div>
    </div>
  );
};

export default PopularVastuTips;
