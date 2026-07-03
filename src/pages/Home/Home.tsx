import AIFeatures from "../../components/HomePage/AIFeatures/AIFeatures";
import AppFeatures from "../../components/HomePage/AppFeatures/AppFeatures";
import Hero from "../../components/HomePage/Hero/Hero";
import WhyChooseVedicWisdom from "../../components/HomePage/WhyChooseVedicWisdom/WhyChooseVedicWisdom";

const Home = () => {
  return (
    <div>
      <Hero />
      <AppFeatures />
      <AIFeatures />
      <WhyChooseVedicWisdom />
    </div>
  );
};

export default Home;
