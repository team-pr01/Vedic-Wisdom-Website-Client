import DashboardStatistics from "../../../../components/Dashboard/VedicShopPage/VendorDashboardPage/DashboardStatistics/DashboardStatistics";
import MyProducts from "../../../../components/Dashboard/VedicShopPage/VendorDashboardPage/MyProducts/MyProducts";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";

const VendorDashboard = () => {
  
  return (
    <div className="font-Manrope">
      <DashboardHeading
        title={`Welcome Back, Mr Akash!`}
        description={`Shop Name: Akash Fashion`}
      />
    <DashboardStatistics/>
    <MyProducts/>
      
    </div>
  );
};

export default VendorDashboard;
