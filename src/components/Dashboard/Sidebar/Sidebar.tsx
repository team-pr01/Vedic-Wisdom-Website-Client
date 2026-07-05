/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setUser,
  useCurrentUser,
} from "../../../redux/Features/Auth/authSlice";
import { IMAGES } from "../../../assets";
import { sidebarLinks } from "./sidebarLinks";
import { LuCircleHelp } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import Button from "../../Reusable/Button/Button";

export interface DashboardLink {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar = () => {
  const user = useSelector(useCurrentUser) as any;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(setUser({ user: null, token: null }));
    dispatch(logout());
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="top-0 left-0 hidden xl:block font-Manrope">
      <div className="w-57 2xl:w-75 h-full bg-neutral-30 rounded-r-4xl border-r border-neutral-55 shadow-sidebar p-5 font-Nunito flex flex-col gap-5 justify-between">
        <div>
          <div>
            <Link to="/">
              <img src={IMAGES.logo} alt="" />
            </Link>
            <hr className="border border-neutral-75/60 h-px mt-6" />
          </div>
          <div className="flex flex-col gap-4 h-full xl:h-80 2xl:h-120 overflow-y-auto custom-scrollbar mt-6">
            <div className="flex flex-col gap-">
              {sidebarLinks?.map((link) => (
                <Link
                  key={link?.label}
                  to={link?.path}
                  className={`flex items-center gap-2 rounded-lg p-3.5 transform transition-transform duration-500 hover:-translate-y-1 ${
                    location?.pathname === link?.path
                      ? "bg-gradient-sidebar-selected-link text-primary-10 font-semibold"
                      : "font-medium text-neutral-40 bg-none"
                  }`}
                >
                  <div className="size-6 flex items-center justify-center shrink-0">
                    {link?.icon}
                  </div>
                  <span className="leading-none">{link?.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <hr className="border border-neutral-75/60 h-px mt-4" />
          <div className="mt-2">
            <Link
              to={"/dashboard/help"}
              className={`flex items-center gap-2 rounded-lg p-3.5 transform transition-transform duration-500 hover:-translate-y-1 ${
                location?.pathname === "/dashboard/help"
                  ? "bg-gradient-sidebar-selected-link text-primary-10 font-semibold"
                  : "font-medium text-neutral-40 bg-none"
              }`}
            >
              <div className="size-6 flex items-center justify-center shrink-0 text-xl">
                <LuCircleHelp />
              </div>
              <span className="leading-none">Help</span>
            </Link>
            <button
              onCanPlay={handleLogout}
              className={`flex items-center gap-2 rounded-lg p-3.5 transform transition-transform duration-500 hover:-translate-y-1 text-neutral-40 font-medium`}
            >
              <div className="size-6 flex items-center justify-center shrink-0 text-xl">
                <FiLogOut />
              </div>
              <span className="leading-none">Logout</span>
            </button>
          </div>
        </div>

        <div className="bg-neutral-45 border-primary-50 p-4 shadow-hero-user-community-box flex flex-col justify-between rounded-2xl relative group text-left">
          <div className="z-10 relative">
            <h2
              className={`group-hover:text-primary-10 transition duration-300 text-xl font-semibold`}
            >
              Unlock 30% Premium Discount
            </h2>
            <p className="description text-sm mt-2">
              Invite 2 Friends & Unlock 30% Premium Discount.
            </p>

            <Button
              label="Get Started"
              className="w-full  py-2 mt-4"
            />
          </div>
          <img
            src={IMAGES.appFeatureGradient}
            alt=""
            className={`absolute top-0 rotate-180 rounded-2xl left-0 right-0  group-hover:opacity-100 transition duration-300 w-full h-full z-0`}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
