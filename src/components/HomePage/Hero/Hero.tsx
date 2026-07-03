import { Link } from "react-router-dom";
import Container from "../../Reusable/Container/Container";
import Button from "../../Reusable/Button/Button";
import { ICONS, IMAGES } from "../../../assets";
import Badge from "../../Reusable/Badge/Badge";

const Hero = () => {
  return (
    <div className="bg-gradient-hero rounded-b-[68px] font-Manrope pt-20 relative">
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

          <div className="flex items-center gap-6 mt-5">
            <Link to="/signin">
              <Button
                label="Explore Features"
                variant="secondary"
                className="text-sm"
                rightIcon={ICONS.explore}
              />
            </Link>
            <a href="/signup/tutor">
              <Button
                label="Get Started"
                className="text-sm"
                rightIcon={ICONS.arrowRight}
              />
            </a>
          </div>

          <img src={IMAGES.heroImg} alt="" />

          <div className="absolute top-[60%] left-10">
            <div className="p-6 border border-primary-50 bg-neutral-45 shadow-hero-user-community-box rounded-4xl text-start relative overflow-hidden">
              <div className="flex items-center gap-4">
                <img src={IMAGES.userCommunity} alt="" />
                <div>
                  <h3 className="text-primary-10 text-2xl font-bold">10K +</h3>
                  <p className="text-primary-10 text-sm font-semibold mt-2">
                    Active Users
                  </p>
                </div>
              </div>

              <h3 className="text-neutral-40 text-2xl font-bold mt-15 relative z-10">
                Loved by 50,000+ devotees
              </h3>
              <p className="text-neutral-50 mt-1 max-w-75 relative z-10">
                Across temples, spiritual schools, and Sanatan communities
                worldwide.
              </p>

              <div className="w-82 h-25 rounded-[331px] bg-primary-60 blur-[44px] -rotate-45 absolute -right-25 -bottom-25"></div>
              <div className="w-82 h-25 rounded-[331px] bg-primary-60 blur-[44px] -rotate-45 absolute -left-43.25 -bottom-25"></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
