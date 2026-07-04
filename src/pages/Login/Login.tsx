import LoginAccount from "../../components/LoginPage/LoginAccount/LoginAccount";
import AuthHero from "../../components/Reusable/AuthHero/AuthHero";
import DownloadApp from "../../components/Shared/DownloadApp/DownloadApp";

const Login = () => {
  return (
    <div>
      <AuthHero
        badge="“ॐ नमः शिवाय”"
        title="Welcome Back to Your Spiritual Journey"
        titleHighlight="Spiritual"
        description="Log in to continue your journey with personalized guidance, sacred knowledge, and community support."
      />
      <LoginAccount />
      <DownloadApp />
    </div>
  );
};

export default Login;
