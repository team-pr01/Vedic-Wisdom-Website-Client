import { GiGreekTemple } from "react-icons/gi";
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuLeaf,
  LuMoon,
  LuBriefcase,
  LuUtensils,
  LuShoppingBag,
  LuBookOpen,
  LuBrain,
  LuGraduationCap,
} from "react-icons/lu";

import {
  MdOutlineHome,
  MdOutlineAudioFile,
  MdOutlineWorkOutline,
  MdOutlinePerson,
} from "react-icons/md";

interface DashboardLink {
  label: string;
  path: string;
  icon: React.ReactNode;
  subLinks?: DashboardLink[];
}

export const sidebarLinks: DashboardLink[] = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: <LuLayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "My Profile",
    path: "/dashboard/my-profile",
    icon: <MdOutlinePerson className="w-5 h-5" />,
  },
  {
    label: "Yoga",
    path: "/dashboard/yoga",
    icon: <MdOutlineWorkOutline className="w-5 h-5" />,
  },
  {
    label: "Sanatan Sthal",
    path: "/dashboard/sanatan-sthal",
    icon: <GiGreekTemple className="w-5 h-5" />,
  },
  {
    label: "Ayurveda",
    path: "/dashboard/ayurveda",
    icon: <LuLeaf className="w-5 h-5" />,
  },
  {
    label: "Vastu",
    path: "/dashboard/vastu",
    icon: <MdOutlineHome className="w-5 h-5" />,
  },
  {
    label: "Jyotish",
    path: "/dashboard/jyotish",
    icon: <LuMoon className="w-5 h-5" />,
  },
  {
    label: "Consultancy",
    path: "/dashboard/consultancy",
    icon: <LuBriefcase className="w-5 h-5" />,
  },
  {
    label: "Food",
    path: "/dashboard/food",
    icon: <LuUtensils className="w-5 h-5" />,
  },
  {
    label: "Shop",
    path: "/dashboard/shop",
    icon: <LuShoppingBag className="w-5 h-5" />,
  },
  {
    label: "Job Board",
    path: "/dashboard/job-board",
    icon: <LuClipboardList className="w-5 h-5" />,
  },
  {
    label: "Learn & Explore",
    path: "/dashboard/learn-explore",
    icon: <LuBookOpen className="w-5 h-5" />,
    subLinks: [
      {
        label: "Course",
        path: "/dashboard/learn-explore/course",
        icon: <LuGraduationCap className="w-5 h-5" />,
      },
      {
        label: "Quiz",
        path: "/dashboard/learn-explore/quiz",
        icon: <LuBrain className="w-5 h-5" />,
      },
      {
        label: "Audio Book",
        path: "/dashboard/learn-explore/audio-book",
        icon: <MdOutlineAudioFile className="w-5 h-5" />,
      },
      {
        label: "Food",
        path: "/dashboard/learn-explore/food",
        icon: <LuUtensils className="w-5 h-5" />,
      },
    ],
  },
];
