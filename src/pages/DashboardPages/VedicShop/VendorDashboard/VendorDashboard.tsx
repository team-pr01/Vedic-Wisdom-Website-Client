import { useSelector } from "react-redux";
import DashboardStatistics from "../../../../components/Dashboard/VedicShopPage/VendorDashboardPage/DashboardStatistics/DashboardStatistics";
import MyProducts from "../../../../components/Dashboard/VedicShopPage/VendorDashboardPage/MyProducts/MyProducts";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import { useCurrentUser, type TLoggedInUser } from "../../../../redux/Features/Auth/authSlice";

const VendorDashboard = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  return (
    <div className="font-Manrope">
      <DashboardHeading
        title={`Welcome Back, ${user?.name}!`}
        description={`Manage your products and sales.`}
      />
    <DashboardStatistics/>
    <MyProducts/>
      
    </div>
  );
};

export default VendorDashboard;
