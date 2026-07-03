import AIFeatures from "../../components/HomePage/AIFeatures/AIFeatures";
import AppFeatures from "../../components/HomePage/AppFeatures/AppFeatures";
import Hero from "../../components/HomePage/Hero/Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <AppFeatures />
      <AIFeatures />
    </div>
  );
};

export default Home;
