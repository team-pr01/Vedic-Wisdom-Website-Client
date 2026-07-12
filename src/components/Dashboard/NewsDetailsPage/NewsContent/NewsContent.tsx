import { IoHeartOutline } from "react-icons/io5";
import { ICONS, IMAGES } from "../../../../assets";

const NewsContent = () => {
  return (
    <div className="">
      <h4 className="text-neutral-90 font-bold text-2xl">
        Grand Spiritual Gathering Held in Varanasi
      </h4>

      <img
        src={IMAGES.dummyProject}
        alt=""
        className="w-full rounded-xl h-100 object-cover mt-3"
      />

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
          <button className="flex items-center gap-1">
            <img src={ICONS.share} alt="" />
          </button>
        </div>
      </div>

      <p className="text-neutral-10 text-sm 3xl:text-base mt-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
        vitae vero labore saepe libero corporis numquam error eius temporibus
        eum.
      </p>
    </div>
  );
};

export default NewsContent;
