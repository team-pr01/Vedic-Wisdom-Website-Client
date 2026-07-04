import { IMAGES } from "../../../assets";
import Badge from "../../Reusable/Badge/Badge";
import Container from "../../Reusable/Container/Container";
import SignupForm from "./SignupForm";

const CreateAccount = () => {
  return (
    <div className="py-23 bg-gradient-app-features font-Manrope">
      <Container>
        <div className="flex gap-14">
          <div className="w-[45%] flex flex-col gap-5">
            <Badge label="Everything You Need" />
            <h1 className="heading">
              One <span className="text-primary-10">App</span> <br />
              Infinite <span className="text-primary-10">Wisdom.</span>
            </h1>
            <p className="description">
              From sacred texts to AI spiritual guidance, Vedic Wisdom brings
              together every aspect of your Sanatan lifestyle in a single,
              beautifully designed app.
            </p>

            <img src={IMAGES.signupImg} alt="" className="mt-5" />
          </div>

          <div className="w-[55%]">
            <SignupForm/>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateAccount;
