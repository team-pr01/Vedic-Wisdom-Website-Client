import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { TProject } from "../../../types/project.type";
import DonationModal from "./DonationModal";

const ProjectCard = ({ project }: { project: TProject }) => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="border border-primary-10/20 bg-neutral-65 space-y-4 text-left rounded-4xl group relative">
        <img
          src={project?.imageUrl || IMAGES.imagePlaceholder}
          alt=""
          className="rounded-t-2xl h-56 w-full object-cover"
        />
        <div className="px-5 pb-5">
          <div className="relative z-10">
            <h2 className="text-neutral-10 text-xl font-bold">
              {project?.title}
            </h2>
            <p className="text-neutral-60 text-sm mt-2">
              {project?.description}
            </p>
          </div>
          <div className="flex items-center gap-3 relative z-10 mt-4">
            <Link
              to={`/dashboard/project/${project?._id}`}
              className="text-neutral-5 text-sm hover:underline"
            >
              View Details
            </Link>
            <Button
              label="Donate Now"
              className="text-xs 2xl:text-[13px] py-2"
              rightIcon={ICONS.arrowRight}
              onClick={() => setIsDonateModalOpen(true)}
            />
          </div>

          <img
            src={IMAGES.appFeatureGradient}
            alt=""
            className={`absolute bottom-0 rounded-b-4xl left-0 right-0 opacity-0 group-hover:opacity-100 transition duration-300 w-full`}
          />
        </div>
      </div>
      <DonationModal
        isModalOpen={isDonateModalOpen}
        setIsModalOpen={setIsDonateModalOpen}
        projectId={project?._id}
      />
    </>
  );
};

export default ProjectCard;
