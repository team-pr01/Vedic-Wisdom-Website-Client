import { Link } from "react-router-dom";
import Container from "../../Reusable/Container/Container";
import Button from "../../Reusable/Button/Button";
import { ICONS, IMAGES } from "../../../assets";
import Badge from "../../Reusable/Badge/Badge";

const Hero = () => {
  return (
    <div className="bg-gradient-hero rounded-b-4xl sm:rounded-b-[48px] lg:rounded-b-[68px] font-Manrope pt-10 sm:pt-14 lg:pt-20 relative overflow-hidden">
      <Container>
        <div className="flex flex-col gap-5 items-center text-center">
          <Badge label="“ॐ नमः शिवाय”" />
          <h1 className="heading">
            Ancient <span className="text-primary-10">Wisdom</span> <br />
            Modern <span className="text-primary-10">Living.</span>
          </h1>
          <p className="description">
            Your AI-powered gateway to Vedic knowledge, Sanatan traditions, and
            a dharma-aligned life. Sacred texts, Jyotish, Ayurveda, Yoga, and
            community — all in one beautiful app.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-5 w-full sm:w-auto">
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button
                label="Explore Features"
                variant="secondary"
                className="text-sm w-full sm:w-auto"
                rightIcon={ICONS.explore}
              />
            </Link>
            <a href="/signup" className="w-full sm:w-auto">
              <Button
                label="Get Started"
                className="text-sm w-full sm:w-auto"
                rightIcon={ICONS.arrowRight}
              />
            </a>
          </div>

          {/* Hero image + stat card wrapper */}
          <div className="relative w-full mt-6 lg:mt-0">
            <img src={IMAGES.heroImg} alt="" className="mx-auto" />

            {/* Stat card — absolutely positioned on desktop only */}
            <div className="hidden lg:block absolute top-[60%] left-10">
              <StatCard />
            </div>
          </div>

          {/* Stat card — in-flow on mobile/tablet */}
          <div className="lg:hidden w-full max-w-md mx-auto -mt-6 sm:-mt-10">
            <StatCard />
          </div>
        </div>
      </Container>
    </div>
  );
};

const StatCard = () => (
  <div className="p-5 sm:p-6 border border-primary-50 bg-neutral-45 shadow-hero-user-community-box rounded-3xl lg:rounded-4xl text-start relative overflow-hidden">
    <div className="flex items-center gap-4">
      <img src={IMAGES.userCommunity} alt="" className="shrink-0" />
      <div>
        <h3 className="text-primary-10 text-xl sm:text-2xl font-bold">
          10K +
        </h3>
        <p className="text-primary-10 text-sm font-semibold mt-1 sm:mt-2">
          Active Users
        </p>
      </div>
    </div>

    <h3 className="text-neutral-40 text-xl sm:text-2xl font-bold mt-8 sm:mt-12 lg:mt-15 relative z-10">
      Loved by 50,000+ devotees
    </h3>
    <p className="text-neutral-50 text-sm sm:text-base mt-1 max-w-75 relative z-10">
      Across temples, spiritual schools, and Sanatan communities worldwide.
    </p>

    <div className="w-60 sm:w-82 h-20 sm:h-25 rounded-[331px] bg-primary-60 blur-[44px] -rotate-45 absolute -right-16 sm:-right-25 -bottom-16 sm:-bottom-25" />
    <div className="w-60 sm:w-82 h-20 sm:h-25 rounded-[331px] bg-primary-60 blur-[44px] -rotate-45 absolute -left-28 sm:-left-43.25 -bottom-16 sm:-bottom-25" />
  </div>
);

export default Hero;