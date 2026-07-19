import { ICONS } from "../../../assets";
import ProjectCard from "../../../components/HomePage/OurProjects/ProjectCard";
import Button from "../../../components/Reusable/Button/Button";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import FoodCardSkeleton from "../../../components/SkeletonLoaders/FoodCardSkeleton/FoodCardSkeleton";
import { useGetAllProjectsQuery } from "../../../redux/Features/Project/projectApi";
import type { TProject } from "../../../types/project.type";

const OurProjects = () => {
  const { data, isLoading } = useGetAllProjectsQuery({});
  const allProjects = data?.data?.projects || [];
  return (
    <div className="font-Manrope space-y-8">
      <DashboardHeading
        title="Our Project"
        description="Explore our project and learn more about our mission and vision."
      />

      <div className="grid grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <FoodCardSkeleton key={index} />
            ))
          : allProjects?.map((project: TProject) => (
              <ProjectCard key={project?._id} project={project} />
            ))}
      </div>

      <div className="bg-neutral-82 p-10 rounded-xl flex items-center justify-between sticky bottom-0 border border-neutral-55 z-10">
        <div className="flex items-center gap-6">
          <img src={ICONS.raiseFund} alt="" />
          <div className="relative z-10">
            <h2 className="text-neutral-10 text-xl font-bold">
              Every Contribution Creates a Lasting Impact
            </h2>
            <p className="text-neutral-60 text-sm mt-2 max-w-[80%]">
              Choose a project that inspires you and help bring it to life. Your
              support fuels spiritual growth, community welfare, temple
              preservation, and cultural initiatives.
            </p>
          </div>
        </div>

        <Button variant="secondary" label="Your Support Matters"/>
      </div>
    </div>
  );
};

export default OurProjects;
