import { ICONS } from "../../../../../assets";
import type { TCourse } from "../../../../../types/course.type";
import Button from "../../../../Reusable/Button/Button";

const CourseCard = ({ course }: { course: TCourse }) => {
  return (
    <div className="rounded-2xl relative shadow-food-card w-fit border border-primary-80/60 bg-white">
      <img
        src={course?.thumbnail}
        alt=""
        className="rounded-t-2xl h-56 object-cover"
      />
      <div className="p-5">
        <h4 className="text-neutral-90 font-bold">{course?.title}</h4>

        <a href={course?.courseUrl} target="_blank">
          <Button
            variant="secondary"
            label="View Details"
            className="mt-3 w-full"
          />
        </a>
      </div>

      <div className="flex items-center gap-1 bg-white rounded-md absolute top-2 left-2 p-1">
        <img src={ICONS.time} alt="" />
        <p className="text-neutral-50 text-xs">{course?.duration}</p>
      </div>
    </div>
  );
};

export default CourseCard;
