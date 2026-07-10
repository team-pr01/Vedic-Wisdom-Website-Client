import { ICONS, IMAGES } from "../../../../../assets";
import Button from "../../../../Reusable/Button/Button";

const CourseCard = () => {
  return (
    <div className="rounded-2xl relative shadow-food-card w-fit border border-primary-80/60 bg-white">
      <img
        src={IMAGES.dummyCourse}
        alt=""
        className="rounded-t-2xl h-56 object-cover"
      />
      <div className="p-5">
        <h4 className="text-neutral-90 font-bold">
          Learn Web Design For Beginners - Full Course
        </h4>

        <Button
          variant="secondary"
          label="View Details"
          className="mt-3 w-full"
        />
      </div>

      <div className="flex items-center gap-1 bg-white rounded-md absolute top-2 left-2 p-1">
        <img src={ICONS.time} alt="" />
        <p className="text-neutral-50 text-xs">10hr</p>
      </div>
    </div>
  );
};

export default CourseCard;
