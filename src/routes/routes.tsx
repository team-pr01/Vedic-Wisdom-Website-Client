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
import SanatanSthalDetails from "../pages/DashboardPages/SanatanSthal/SanatanSthalDetails/SanatanSthalDetails";
import Ayurveda from "../pages/DashboardPages/Ayurveda/Ayurveda";
import Astrology from "../pages/DashboardPages/Astrology/Astrology";
import Consultancy from "../pages/DashboardPages/Consultancy/Consultancy";
import Course from "../pages/DashboardPages/LearnAndExplore/Course/Course";
import VedicShop from "../pages/DashboardPages/VedicShop/VedicShop";
import ProductDetails from "../pages/DashboardPages/VedicShop/ProductDetails/ProductDetails";
import BecomeAVendor from "../pages/DashboardPages/VedicShop/BecomeAVendor/BecomeAVendor";
import AddTemple from "../pages/DashboardPages/SanatanSthal/AddTemple/AddTemple";
import Book from "../pages/DashboardPages/LearnAndExplore/Book/Book";
import BookDetails from "../pages/DashboardPages/LearnAndExplore/Book/BookDetails/BookDetails";
import VendorDashboard from "../pages/DashboardPages/VedicShop/VendorDashboard/VendorDashboard";
import AddProduct from "../pages/DashboardPages/VedicShop/AddProduct/AddProduct";
import AiChatbot from "../pages/DashboardPages/AiChatbot/AiChatbot";
import News from "../pages/DashboardPages/News/News";
import NewsDetails from "../pages/DashboardPages/NewsDetails/NewsDetails";
import MyReferrals from "../pages/DashboardPages/MyProfile/MyReferrals/MyReferrals";
import SubscriptionPricing from "../components/HomePage/SubscriptionPricing/SubscriptionPricing";
import SpiritualVideos from "../pages/DashboardPages/SpiritualVideos/SpiritualVideos";
import JobPortal from "../pages/DashboardPages/JobPortal/JobPortal";

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
        path: "my-referrals",
        element: <MyReferrals />,
      },
      {
        path: "subscription-plans",
        element: <SubscriptionPricing />,
      },
      {
        path: "spiritual-videos",
        element: <SpiritualVideos />,
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
        path: "add-temple",
        element: <AddTemple />,
      },
      {
        path: "ayurveda",
        element: <Ayurveda />,
      },
      {
        path: "astrology",
        element: <Astrology />,
      },
      {
        path: "consultancy",
        element: <Consultancy />,
      },
      {
        path: "vedic-shop",
        element: <VedicShop />,
      },
      {
        path: "vedic-shop/:id",
        element: <ProductDetails />,
      },
      {
        path: "vedic-shop/become-a-vendor",
        element: <BecomeAVendor />,
      },
      {
        path: "vedic-shop/vendor/dashboard",
        element: <VendorDashboard />,
      },
      {
        path: "vedic-shop/vendor/add-product",
        element: <AddProduct />,
      },
      {
        path: "ai-chatbot",
        element: <AiChatbot />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "news/:id",
        element: <NewsDetails />,
      },
      {
        path: "learn-and-explore/course",
        element: <Course />,
      },
      {
        path: "learn-and-explore/book",
        element: <Book />,
      },
      {
        path: "learn-and-explore/book/:id",
        element: <BookDetails />,
      },
      {
        path: "job-portal",
        element: <JobPortal />,
      },
    ],
  },
]);
