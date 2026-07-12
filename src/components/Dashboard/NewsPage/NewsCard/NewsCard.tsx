import { IoHeartOutline } from "react-icons/io5";
import { ICONS, IMAGES } from "../../../../assets";
import { Link } from "react-router-dom";

const NewsCard = () => {
  return (
    <div className="bg-white border border-primary-80 rounded-xl">
      <img
        src={IMAGES.dummyProject}
        alt=""
        className="w-full rounded-t-xl h-100 object-cover"
      />
      <div className="p-5">
        <h4 className="text-neutral-90 font-bold text-xl">
          Grand Spiritual Gathering Held in Varanasi
        </h4>
        <p className="text-neutral-10 text-sm 3xl:text-base mt-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
          vitae vero labore saepe libero corporis numquam error eius temporibus
          eum.
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <img src={ICONS.calendar} alt="" />
              <p className="text-neutral-90 text-sm">10-05-2026</p>
            </div>

            <div className="px-2 py-1 bg-neutral-70 rounded text-primary-10 text-sm w-fit">
              Temple
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1">
              <IoHeartOutline className="text-xl text-primary-10" />
              <p className="text-neutral-90 text-sm">20</p>
            </button>
            <Link to="/dashboard/news/1" className="flex items-center gap-1.5">
              <p className="text-neutral-5 text-sm font-semibold">Read More</p>
              <img src={ICONS.arrowRight} alt="" className="w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
