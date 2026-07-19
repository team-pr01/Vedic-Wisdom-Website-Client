/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import { Link } from "react-router-dom";
import Modal from "../../Reusable/Modal/Modal";
import { useState } from "react";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
import type { TProject } from "../../../types/project.type";

type TFormData = {
  fullName: string;
  phoneNumber: string;
  amount: string;
};
const ProjectCard = ({ project }: { project: TProject }) => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormData>();

  const handleDonate = (data: TFormData) => {
    try {
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="border border-primary-10/20 bg-neutral-65 space-y-4 text-left rounded-4xl group relative">
        <img
          src={project?.imageUrl}
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
      <Modal
        isModalOpen={isDonateModalOpen}
        setIsModalOpen={setIsDonateModalOpen}
      >
        <div className="flex flex-col items-center text-center p-4">
          <h2 className="text-neutral-90 text-2xl font-bold">
            Support Us Do Good
          </h2>
          <p className="text-sm text-neutral-50 font-medium mt-2">
            Spreading authentic Sanatan knowledge to seekers worldwide.
          </p>

          <form
            onSubmit={handleSubmit(handleDonate)}
            className="space-y-4 w-full mt-6 text-left"
          >
            <TextInput
              placeholder="Enter your full name"
              error={errors.fullName}
              {...register("fullName", {
                required: "Full name is required",
              })}
            />
            <TextInput
              placeholder="Enter your phone number"
              error={errors.phoneNumber}
              {...register("phoneNumber")}
            />
            <TextInput
              placeholder="Enter amount you want to donate in BDT (ex: 1000)"
              error={errors.amount}
              {...register("amount")}
            />
            <Button
              type="submit"
              label="Donate Now"
              rightIcon={ICONS.arrowRight}
              className="w-full"
            />
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProjectCard;
