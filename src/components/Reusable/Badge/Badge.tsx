import { ICONS } from "../../../assets";

const Badge = ({ label }: { label: string }) => {
  return (
    <div className="bg-primary-40 border border-primary-30 rounded-tr-sm rounded-tl-4xl rounded-bl-sm rounded-br-4xl text-primary-70 text-sm font-Manrope font-semibold text-center px-4 py-2 w-fit flex items-center gap-2">
      <img src={ICONS.polygon} alt="" />
      {label}
      <img src={ICONS.polygon} alt="" />
    </div>
  );
};

export default Badge;
