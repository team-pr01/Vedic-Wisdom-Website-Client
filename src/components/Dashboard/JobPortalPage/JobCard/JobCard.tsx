import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";

const JobCard = () => {
  const jobAdditionalInfo = [
    {
      icon: ICONS.location,
      value: "Bangladesh",
    },
    {
      icon: ICONS.time,
      value: "Full Time",
    },
    {
      icon: ICONS.experience,
      value: "3-5 yrs exp",
    },
  ];
  return (
    <div className="bg-white rounded-xl border border-primary-80 p-3 xl:p-4 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="size-12.5 bg-neutral-30 border border-neutral-86 rounded-md flex items-center justify-center">
          <img src={ICONS.google} alt="" className="size-8" />
        </div>

        <div>
          <h5 className="text-neutral-90 text-lg font-bold">
            Senior UI/UX Designer
          </h5>
          <div className="flex items-center gap-1">
            <p className="text-neutral-50">google</p>
            <img src={ICONS.checkMark} alt="" className="size-4 mt-1" />
          </div>
        </div>
      </div>

      <p className="text-neutral-50 mt-2">
        UX Designers blend design and development, shaping Google's innovative
        concepts.
      </p>

      <div className="flex items-center justify-between">
        {jobAdditionalInfo.map((info, index) => (
          <div key={index} className="flex items-center gap-2">
            <img src={info.icon} alt="" className="size-4" />
            <p>{info.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-neutral-50/10 h-0.5" />

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          leftIcon={ICONS.share}
          className="py-2.75"
        />
        <div className="flex items-center gap-3">
          <Link to={`/dashboard/job/${1}`}>
            <Button variant="secondary" label="View Details" />
          </Link>
          <Button
            variant="primary"
            label="Apply Now"
            rightIcon={ICONS.arrowRight}
          />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
