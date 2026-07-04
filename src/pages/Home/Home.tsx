import AIFeatures from "../../components/HomePage/AIFeatures/AIFeatures";
import AppFeatures from "../../components/HomePage/AppFeatures/AppFeatures";
import Hero from "../../components/HomePage/Hero/Hero";
import OurProjects from "../../components/HomePage/OurProjects/OurProjects";
import SubscriptionPricing from "../../components/HomePage/SubscriptionPricing/SubscriptionPricing";
import WhyChooseVedicWisdom from "../../components/HomePage/WhyChooseVedicWisdom/WhyChooseVedicWisdom";
import DownloadApp from "../../components/Shared/DownloadApp/DownloadApp";
import FAQ from "../../components/Shared/FAQ/FAQ";

const Home = () => {
  return (
    <div>
      <Hero />
      <AppFeatures />
      <AIFeatures />
      <WhyChooseVedicWisdom />
      <SubscriptionPricing />
      <OurProjects />
      <FAQ />
      <DownloadApp />
    </div>
  );
};

export default Home;
