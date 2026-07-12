/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  IoGridOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { ICONS } from "../../../../assets";

const UserMenu = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userMenuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <IoGridOutline size={18} />,
    },
    {
      label: "My Profile",
      path: "/dashboard/my-profile",
      icon: <IoPersonOutline size={18} />,
    },
    {
      label: "Settings",
      path: "/dashboard/account-settings",
      icon: <IoSettingsOutline size={18} />,
    },
  ];

  const dropdownVariants: any = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -45,
      y: -15,
      x: 15,
      transformOrigin: "top right",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      x: 0,
      transformOrigin: "top right",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };
  return (
    <div ref={userMenuRef} className="relative">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="size-8 rounded-full border border-primary-80 bg-neutral-70 hover:bg-primary-10/20 transition duration-300 shadow-dashboard-header-button flex items-center justify-center"
      >
        <img src={ICONS.user} alt="" className="size-5" />
      </button>

      <AnimatePresence>
        {isUserMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="absolute top-[calc(100%+15px)] right-0 w-56 bg-white rounded-2xl shadow-2xl border border-neutral-55 overflow-hidden z-60"
          >
            <div className="p-2">
              {userMenuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl text-neutral-5 hover:bg-primary-5/5 hover:text-primary-5 transition-all font-medium text-sm"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}

              <div className="h-px bg-neutral-10/10 my-2 mx-2" />

              <button
                // onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
              >
                <IoLogOutOutline size={18} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
