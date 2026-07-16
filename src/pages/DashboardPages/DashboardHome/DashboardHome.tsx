import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";

const DashboardHome = () => {
    const user = useSelector(useCurrentUser);
    console.log(user);
    return (
        <div>
            <h1>Dashboard Home</h1>
        </div>
    );
};

export default DashboardHome;