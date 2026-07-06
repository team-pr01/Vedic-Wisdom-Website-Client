import { ICONS, IMAGES } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";

const TempleCard = () => {
  return (
    <div className="rounded-xl border border-primary-80 p-3 bg-white">
      <img
        src={IMAGES.dummyProject}
        alt=""
        className="rounded-xl w-full h-56 object-cover"
      />
      <h4 className="text-neutral-90 font-bold mt-3">Ayurvedic Khichadi</h4>
      <p className="description mt-1">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur,
        vel?
      </p>

      <div className="flex items-center gap-3 mt-3">
        <div className="flex items-center gap-2">
          <img src={ICONS.location} alt="" />
          <p className="text-neutral-50 text-sm">Amritsar, India</p>
        </div>
        <div className="px-2 py-1 rounded bg-primary-50 text-primary-10 text-xs text-center">
          <span>Ganesh Mandir</span>
        </div>
      </div>

      <Button variant="secondary" label="View Details" className="mt-4 w-full" />
    </div>
  );
};

export default TempleCard;
