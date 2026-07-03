import { IMAGES } from "../../../assets";
import Badge from "../../Reusable/Badge/Badge";
import Container from "../../Reusable/Container/Container";

const AIFeatures = () => {
  return (
    <div className="py-23 bg-gradient-ai-features font-Manrope">
      <img src={IMAGES.horizontalLine} alt="" className="mx-auto" />
      <Container>
        <div className="flex flex-col gap-5 items-center text-center mt-20">
          <Badge label="AI-powered solution" />
          <h1 className="heading">
            Your AI <span className="text-primary-10">Spiritual</span> <br />
            Companion <span className="text-primary-10">Awaits.</span>
          </h1>
          <p className="description">
            Thousands of years of Vedic wisdom, now accessible through the power
            of AI — respectful, personalized, and always available.
          </p>

          <img src={IMAGES.aiFeatures} alt="" className="mt-10" />
        </div>
      </Container>
    </div>
  );
};

export default AIFeatures;