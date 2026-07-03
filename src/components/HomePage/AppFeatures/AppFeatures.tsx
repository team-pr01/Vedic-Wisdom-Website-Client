/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ICONS, IMAGES } from "../../../assets";
import Badge from "../../Reusable/Badge/Badge";
import Container from "../../Reusable/Container/Container";

const AppFeatures = () => {
  const appFeatures = [
    {
      id: 1,
      icon: ICONS.spiritualContent,
      title: "Spiritual Content",
      description: "Vedic knowledge through scriptures, audio books",
      image: IMAGES.sacredTextScreen,
    },
    {
      id: 2,
      icon: ICONS.vedicLife,
      title: "Vastu & Vedic Life",
      description:
        "Ancient lifestyle sciences that help align your space, diet",
      image: null,
    },
    {
      id: 3,
      icon: ICONS.astrology,
      title: "Jyotish & Astrology",
      description: "Kundali readings, horoscope insights, Muhurta guidance",
      image: null,
    },
    {
      id: 4,
      icon: ICONS.yogaWellness,
      title: "Yoga & Wellness",
      description: "Practice yoga, meditation, and wellness rituals",
      image: null,
    },
    {
      id: 5,
      icon: ICONS.learnExplore,
      title: "Learn, Explore & Quiz",
      description: "Learn through quizzes, challenges, achievements",
      image: null,
    },
    {
      id: 6,
      icon: ICONS.jobPortal,
      title: "Job Portal",
      description:
        "Explore jobs, volunteering opportunities, community projects",
      image: null,
    },
    {
      id: 7,
      icon: ICONS.vedicShop,
      title: "Vedic Marketplace",
      description:
        "Marketplace featuring sacred items, traditional clothing, books",
      image: null,
    },
    {
      id: 8,
      icon: ICONS.consultations,
      title: "Consultancy Services",
      description: "Book consultations with experienced practitioners",
      image: null,
    },
  ];
  const [selectedFeature, setSelectedFeature] = useState<any>(appFeatures[0]);
  return (
    <div className="py-23 bg-gradient-app-features">
      <Container>
        <div className="flex justify-center gap-10">
          <div className="w-[45%]">
            <img src={selectedFeature?.image} alt="" className="w-[60%] mx-auto" />
          </div>

          <div className="w-[55%] flex flex-col gap-5">
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

            <div className="grid grid-cols-2 gap-5 mt-5">
              {appFeatures?.map((feature) => (
                <button
                  key={feature?.id}
                  onClick={() => setSelectedFeature(feature)}
                  className="bg-neutral-45 border-primary-50 p-6 shadow-hero-user-community-box flex flex-col justify-between rounded-4xl h-64 relative group text-left"
                >
                  <div className={`group-hover:bg-primary-10 border p-4 rounded-2xl flex items-center justify-center w-fit transition duration-300 ${selectedFeature?.id === feature?.id ? 'bg-primary-10 border-primary-10' : 'bg-white border-neutral-20'}`}>
                    <img src={feature?.icon} alt="" className="size-10" />
                  </div>

                  <div>
                    <h2 className={`group-hover:text-primary-10 transition duration-300 text-2xl font-semibold ${selectedFeature?.id === feature?.id ? 'text-primary-10' : 'text-neutral-40'}`}>
                      {feature?.title}
                    </h2>
                    <p className="description mt-2">{feature?.description}</p>
                  </div>
                  <img
                    src={IMAGES.appFeatureGradient}
                    alt=""
                    className={`absolute bottom-0 rounded-b-4xl left-0 right-0  group-hover:opacity-100 transition duration-300 ${selectedFeature?.id === feature?.id ? 'opacity-100' : 'opacity-0'}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AppFeatures;
