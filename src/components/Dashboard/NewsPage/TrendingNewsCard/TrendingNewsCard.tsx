import { IoHeartOutline } from "react-icons/io5";
import { ICONS, IMAGES } from "../../../../assets";

const TrendingNewsCard = () => {
  return (
    <div className="bg-white border border-primary-80 rounded-xl flex items-center gap-3 p-2 pr-4">
      <img
        src={IMAGES.dummyProject}
        alt=""
        className="rounded-lg w-40 h-full object-cover"
      />
      <div>
        <h4 className="text-neutral-90 font-bold text-">
          Grand Spiritual Gathering Held in Varanasi
        </h4>
        <p className="text-neutral-10 text-sm mt-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
          vitae
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <img src={ICONS.calendar} alt="" />
              <p className="text-neutral-90 text-xs">10-05-2026</p>
            </div>

            <div className="px-2 py-1 bg-neutral-70 rounded text-primary-10 text-xs w-fit">
              Temple
            </div>
          </div>

          <button className="flex items-center gap-1">
            <IoHeartOutline className="text-xl text-primary-10" />
            <p className="text-neutral-90 text-sm">20</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingNewsCard;
