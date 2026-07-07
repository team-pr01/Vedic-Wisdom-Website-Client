/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Button from "../../Reusable/Button/Button";
import { useState } from "react";

export interface DashboardLink {
  label: string;
  path: string;
  icon: React.ReactNode;
  subLinks?: DashboardLink[];
}

const Sidebar = () => {
  const user = useSelector(useCurrentUser) as any;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedLinks, setExpandedLinks] = useState<Set<string>>(new Set());

  const handleLogout = async () => {
    dispatch(setUser({ user: null, token: null }));
    dispatch(logout());
    localStorage.clear();
    navigate("/signin");
  };

  const toggleExpand = (label: string) => {
    setExpandedLinks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const isLinkActive = (path: string) => {
    return location?.pathname === path;
  };

  const isSubLinkActive = (subLinks?: DashboardLink[]) => {
    if (!subLinks) return false;
    return subLinks.some((sub) => location?.pathname === sub.path);
  };

  return (
    <div className="top-0 left-0 hidden xl:block font-Manrope">
      <div className="w-65 2xl:w-75 h-full bg-neutral-30 rounded-r-4xl border-r border-neutral-55 shadow-sidebar p-5 font-Nunito flex flex-col gap-5 justify-between">
        <div>
          <div>
            <Link to="/">
              <img src={IMAGES.logo} alt="" />
            </Link>
            <hr className="border border-neutral-75/60 h-px mt-6" />
          </div>
          <div className="flex flex-col gap-4 h-full xl:h-80 2xl:h-120 overflow-y-auto custom-scrollbar mt-6">
            <div className="flex flex-col gap-1">
              {sidebarLinks?.map((link) => {
                const hasSubLinks = link.subLinks && link.subLinks.length > 0;
                const isExpanded = expandedLinks.has(link.label);
                const isActive = isLinkActive(link.path);
                const isSubActive = isSubLinkActive(link.subLinks);

                return (
                  <div key={link?.label} className="flex flex-col">
                    {/* Main Link */}
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between rounded-lg p-3.5 transform transition-all duration-300 hover:-translate-y-0.5 ${
                        isActive || isSubActive
                          ? "bg-gradient-sidebar-selected-link text-primary-10 font-semibold"
                          : "font-medium text-neutral-40 bg-none hover:bg-neutral-10/5"
                      }`}
                      onClick={(e) => {
                        if (hasSubLinks) {
                          e.preventDefault();
                          toggleExpand(link.label);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="size-6 flex items-center justify-center shrink-0">
                          {link?.icon}
                        </div>
                        <span className="leading-none">{link?.label}</span>
                      </div>
                      {hasSubLinks && (
                        <div className="shrink-0">
                          {isExpanded ? (
                            <FiChevronUp className="w-4 h-4" />
                          ) : (
                            <FiChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      )}
                    </Link>

                    {/* Sub Links */}
                    {hasSubLinks && (
                      <div
                        className={`
                          overflow-hidden transition-all duration-300 ease-in-out
                          ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                        `}
                      >
                        <div className="ml-4 pl-4 border-l-2 border-neutral-55 space-y-1 mt-1">
                          {link.subLinks?.map((subLink) => (
                            <Link
                              key={subLink?.label}
                              to={subLink?.path}
                              className={`flex items-center gap-2 rounded-lg p-2.5 transition-all duration-300 ${
                                isLinkActive(subLink.path)
                                  ? "text-primary-10 bg-primary-10/10 font-medium"
                                  : "text-neutral-40 hover:text-primary-10 hover:bg-primary-10/5"
                              }`}
                            >
                              <div className="size-5 flex items-center justify-center shrink-0">
                                {subLink?.icon}
                              </div>
                              <span className="text-sm leading-none">
                                {subLink?.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <hr className="border border-neutral-75/60 h-px mt-4" />
          <div className="mt-2">
            <Link
              to={"/dashboard/help"}
              className={`flex items-center gap-2 rounded-lg p-3.5 transform transition-all duration-300 hover:-translate-y-0.5 ${
                location?.pathname === "/dashboard/help"
                  ? "bg-gradient-sidebar-selected-link text-primary-10 font-semibold"
                  : "font-medium text-neutral-40 bg-none hover:bg-neutral-10/5"
              }`}
            >
              <div className="size-6 flex items-center justify-center shrink-0 text-xl">
                <LuCircleHelp />
              </div>
              <span className="leading-none">Help</span>
            </Link>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 rounded-lg p-3.5 transform transition-all duration-300 hover:-translate-y-0.5 text-neutral-40 font-medium hover:bg-neutral-10/5 w-full`}
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

            <Button label="Get Started" className="w-full py-2 mt-4" />
          </div>
          <img
            src={IMAGES.appFeatureGradient}
            alt=""
            className={`absolute top-0 rotate-180 rounded-2xl left-0 right-0 group-hover:opacity-100 transition duration-300 w-full h-full z-0`}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
