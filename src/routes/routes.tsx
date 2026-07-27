import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import NotFound from "../pages/FrontPages/NotFound/NotFound";
import Signup from "../pages/FrontPages/Signup/Signup";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import DashboardHome from "../pages/DashboardPages/DashboardHome/DashboardHome";
import MyProfile from "../pages/DashboardPages/MyProfile/MyProfile";
import Help from "../pages/DashboardPages/Help/Help";
import Food from "../pages/DashboardPages/Food/Food";
import VastuShastra from "../pages/DashboardPages/VastuShastra/VastuShastra";
import OurProjects from "../pages/DashboardPages/OurProjects/OurProjects";
import ProjectDetails from "../pages/DashboardPages/ProjectDetails/ProjectDetails";
import Ayurveda from "../pages/DashboardPages/Ayurveda/Ayurveda";
import Astrology from "../pages/DashboardPages/Astrology/Astrology";
import Consultancy from "../pages/DashboardPages/Consultancy/Consultancy";
import Course from "../pages/DashboardPages/LearnAndExplore/Course/Course";
import VedicShop from "../pages/DashboardPages/VedicShop/VedicShop";
import ProductDetails from "../pages/DashboardPages/VedicShop/ProductDetails/ProductDetails";
import BecomeAVendor from "../pages/DashboardPages/VedicShop/BecomeAVendor/BecomeAVendor";
import Book from "../pages/DashboardPages/LearnAndExplore/Book/Book";
import VendorDashboard from "../pages/DashboardPages/VedicShop/VendorDashboard/VendorDashboard";
import AddProduct from "../pages/DashboardPages/VedicShop/AddProduct/AddProduct";
import AiChatbot from "../pages/DashboardPages/AiChatbot/AiChatbot";
import News from "../pages/DashboardPages/News/News";
import NewsDetails from "../pages/DashboardPages/NewsDetails/NewsDetails";
import MyReferrals from "../pages/DashboardPages/MyProfile/MyReferrals/MyReferrals";
import SubscriptionPricing from "../components/HomePage/SubscriptionPricing/SubscriptionPricing";
import SpiritualVideos from "../pages/DashboardPages/SpiritualVideos/SpiritualVideos";
import JobPortal from "../pages/DashboardPages/JobPortal/JobPortal";
import JobDetails from "../pages/DashboardPages/JobPortal/JobDetails/JobDetails";
import EmployerDashboard from "../pages/DashboardPages/JobPortal/Employer/EmployerDashboard/EmployerDashboard";
import AllApplications from "../pages/DashboardPages/JobPortal/Employer/AllApplications/AllApplications";
import AudioBook from "../pages/DashboardPages/LearnAndExplore/AudioBook/AudioBook";
import PaymentFailed from "../pages/DashboardPages/PaymentFailed/PaymentFailed";
import PaymentSuccess from "../pages/DashboardPages/PaymentSuccess/PaymentSuccess";
import MyLibrary from "../pages/DashboardPages/MyProfile/MyLibrary/MyLibrary";
import AudioBookDetails from "../pages/DashboardPages/LearnAndExplore/AudioBookDetails/AudioBookDetails";
import Home from "../pages/FrontPages/Home/Home";
import Login from "../pages/FrontPages/Login/Login";
import SanatanSthal from "../pages/DashboardPages/Temple/SanatanSthal/SanatanSthal";
import SanatanSthalDetails from "../pages/DashboardPages/Temple/SanatanSthalDetails/SanatanSthalDetails";
import AddTemple from "../pages/DashboardPages/Temple/AddTemple/AddTemple";
import BookDetails from "../pages/DashboardPages/LearnAndExplore/BookDetails/BookDetails";
import MyApplications from "../pages/DashboardPages/JobPortal/MyApplications/MyApplications";

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
      {
        path: "coin-transaction/fail",
        element: <PaymentFailed />,
      },
      {
        path: "coin-transaction/success",
        element: <PaymentSuccess />,
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
        path: "my-library",
        element: <MyLibrary />,
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
        path: "learn-and-explore/audio-book",
        element: <AudioBook />,
      },
      {
        path: "learn-and-explore/audio-book/:id",
        element: <AudioBookDetails />,
      },
      {
        path: "job-portal",
        element: <JobPortal />,
      },
      {
        path: "job/:id",
        element: <JobDetails />,
      },
      {
        path: "my-applications",
        element: <MyApplications />,
      },
      {
        path: "job-portal/employer",
        element: <EmployerDashboard />,
      },
      {
        path: "job-portal/employer/applications/:id",
        element: <AllApplications />,
      },
    ],
  },
]);
