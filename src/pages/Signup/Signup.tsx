import DownloadApp from "../../components/Shared/DownloadApp/DownloadApp";
import CreateAccount from "../../components/SignupPage/CreateAccount/CreateAccount";
import SignupHero from "../../components/SignupPage/SignupHero/SignupHero";

const Signup = () => {
  return (
    <div>
      <SignupHero />
      <CreateAccount/>
      <DownloadApp/>
    </div>
  );
};

export default Signup;