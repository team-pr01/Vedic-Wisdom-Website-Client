import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";

const DashboardHome = () => {
    const user = useSelector(useCurrentUser);
    console.log(user);
    return (
        <div>
            <h1>Dashboard Home</h1>
            Welcome back
        </div>
    );
};

export default DashboardHome;