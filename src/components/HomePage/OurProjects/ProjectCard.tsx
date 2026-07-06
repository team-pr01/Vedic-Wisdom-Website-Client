import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="p-6 border border-primary-10/20 bg-neutral-65 space-y-4 text-left rounded-4xl group relative">
      <img src={project?.image} alt="" className="rounded-2xl" />
      <div className="relative z-10">
        <h2 className="text-neutral-10 text-xl font-bold">{project?.title}</h2>
        <p className="text-neutral-60 text-sm mt-2">{project?.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to={"/dashboard/experts"}
          className="text-neutral-5 text-sm hover:underline"
        >
          View Details
        </Link>
        <Button
          label="Donate Now"
          className="relative text-xs 2xl:text-[13px] z-10 py-2"
          rightIcon={ICONS.arrowRight}
        />
      </div>

      <img
        src={IMAGES.appFeatureGradient}
        alt=""
        className={`absolute bottom-0 rounded-b-4xl left-0 right-0 opacity-0 group-hover:opacity-100 transition duration-300 w-full`}
      />
    </div>
  );
};

export default ProjectCard;
