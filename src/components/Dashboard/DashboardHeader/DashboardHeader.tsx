import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Notification from "./Notification/Notification";

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
            className="rounded-[14px] bg-neutral-85 pl-11 pr-3 py-2.5 w-full focus:outline-none"
            placeholder="Search scriptures, mantras or ask the AI guide"
          />
        </div>
        <Button
          label="Search"
          className="rounded-[14px] py-2.75 border-none "
        />
      </div>

      <div className="flex items-center gap-3">
       <Notification/>
        <button className="size-8 rounded-full border border-primary-80 bg-neutral-70 hover:bg-primary-10/20 transition duration-300 shadow-dashboard-header-button flex items-center justify-center">
          <img src={ICONS.user} alt="" className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
