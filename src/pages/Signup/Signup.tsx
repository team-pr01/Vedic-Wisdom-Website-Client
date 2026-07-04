import AuthHero from "../../components/Reusable/AuthHero/AuthHero";
import DownloadApp from "../../components/Shared/DownloadApp/DownloadApp";
import CreateAccount from "../../components/SignupPage/CreateAccount/CreateAccount";

const Signup = () => {
  return (
    <div>
      <AuthHero
        badge="“ॐ नमः शिवाय”"
        title="Start Your Vedic Journey Today"
        titleHighlight="Vedic"
        description="Create your account and begin exploring the timeless wisdom of Sanatan traditions with AI-powered guidance."
      />
      <CreateAccount />
      <DownloadApp />
    </div>
  );
};

export default Signup;
