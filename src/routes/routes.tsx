import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import DashboardHome from "../pages/DashboardPages/DashboardHome/DashboardHome";
import MyProfile from "../pages/DashboardPages/MyProfile/MyProfile";
import Help from "../pages/DashboardPages/Help/Help";
import Food from "../pages/DashboardPages/Food/Food";
import VastuShastra from "../pages/DashboardPages/VastuShastra/VastuShastra";
import OurProjects from "../pages/DashboardPages/OurProjects/OurProjects";
import ProjectDetails from "../pages/DashboardPages/OurProjects/ProjectDetails";
import SanatanSthal from "../pages/DashboardPages/SanatanSthal/SanatanSthal";
import SanatanSthalDetails from "../pages/DashboardPages/SanatanSthal/SanatanSthalDetails";
import Ayurveda from "../pages/DashboardPages/Ayurveda/Ayurveda";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "food",
        element: <Food />,
      },
      {
        path: "vastu-shastra",
        element: <VastuShastra />,
      },
      {
        path: "our-projects",
        element: <OurProjects />,
      },
      {
        path: "project/:id",
        element: <ProjectDetails />,
      },
      {
        path: "sanatan-sthal",
        element: <SanatanSthal />,
      },
      {
        path: "sanatan-sthal/:id",
        element: <SanatanSthalDetails />,
      },
      {
        path: "ayurveda",
        element: <Ayurveda />,
      },
    ],
  },
]);
