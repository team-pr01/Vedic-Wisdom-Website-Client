import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../../components/Dashboard/DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="flex w-full h-screen bg-white overflow-x-hidden">
      <Sidebar />

      <div className="flex flex-col w-full min-w-0">
        <DashboardHeader />

        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden px-3 lg:px-6 py-6`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
