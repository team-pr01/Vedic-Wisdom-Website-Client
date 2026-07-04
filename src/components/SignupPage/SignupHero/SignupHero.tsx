import Badge from "../../Reusable/Badge/Badge";
import Container from "../../Reusable/Container/Container";

const SignupHero = () => {
  return (
    <div className="py-23 bg-gradient-app-features font-Manrope relative h-110 overflow-hidden">
      <Container>
        <div className="flex flex-col items-center text-center gap-5">
          <Badge label="“ॐ नमः शिवाय”" />
          <h1 className="heading">
            Discover Ancient <span className="text-primary-10">Wisdom</span>{" "}
            <br />
            for Modern <span className="text-primary-10">Life.</span>
          </h1>
          <p className="description">
            Explore spirituality, wellness, sacred knowledge, and AI-powered
            guidance designed to support your everyday journey.
          </p>
        </div>
      </Container>

      <div className="size-134 rounded-full bg-primary-75/40 blur-[90px] absolute -bottom-56 -left-40"></div>
      <div className="size-134 rounded-full bg-primary-75/40 blur-[90px] absolute -bottom-56 -right-40"></div>
    </div>
  );
};

export default SignupHero;
