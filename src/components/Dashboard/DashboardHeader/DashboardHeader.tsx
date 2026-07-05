import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";

const DashboardHeader = () => {
  return (
    <div className="p-6 flex items-center justify-between">
      <div className="bg-primary-50 rounded-2xl p-0.75 flex items-center gap-1 w-fit">
        <div className="relative w-130">
          <img
            src={ICONS.search}
            alt=""
            className="size-6 absolute left-3 top-3"
          />
          <input
            className="rounded-[14px] bg-neutral-85 pl-10 pr-3 py-2.5 w-full"
            placeholder="Search scriptures, mantras or ask the AI guide"
          />
        </div>
        <Button
          label="Search"
          className="rounded-[14px] py-2.75 border-none text-sm xl:text-sm 2xl:text-sm"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="size-8 rounded-full border border-primary-80 bg-neutral-70 hover:bg-primary-10/20 transition duration-300 shadow-dashboard-header-button flex items-center justify-center relative">
          <img src={ICONS.notification} alt="" className="size-5" />
          <div className="size-2 rounded-full bg-red-600 absolute -top-0.75 right-1"></div>
        </button>
        <button className="size-8 rounded-full border border-primary-80 bg-neutral-70 hover:bg-primary-10/20 transition duration-300 shadow-dashboard-header-button flex items-center justify-center">
          <img src={ICONS.user} alt="" className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
