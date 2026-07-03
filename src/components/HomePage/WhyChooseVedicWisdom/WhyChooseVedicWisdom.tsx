import { ICONS, IMAGES } from "../../../assets";
import Badge from "../../Reusable/Badge/Badge";
import Container from "../../Reusable/Container/Container";

const WhyChooseVedicWisdom = () => {
  const counters = [
    {
      id: 1,
      label: "Sacred texts & audiobooks",
      value: 500,
    },
    {
      id: 2,
      label: "Yoga & wellness programs",
      value: 50,
    },
  ];
  const purpose = [
    {
      id: 1,
      icon: ICONS.spiritualContent,
      title: "Spiritual Content",
    },
    {
      id: 2,
      icon: ICONS.vedicLife,
      title: "Vastu & Vedic Life",
    },
    {
      id: 3,
      icon: ICONS.astrology,
      title: "Jyotish & Astrology",
    },
    {
      id: 4,
      icon: ICONS.yogaWellness,
      title: "Yoga & Wellness",
    },
    {
      id: 5,
      icon: ICONS.learnExplore,
      title: "Learn, Explore & Quiz",
    },
    {
      id: 6,
      icon: ICONS.jobPortal,
      title: "Job Portal",
    },
    {
      id: 7,
      icon: ICONS.vedicShop,
      title: "Vedic Marketplace",
    },
    {
      id: 8,
      icon: ICONS.consultations,
      title: "Consultancy Services",
    },
  ];

  return (
    <div className="py-23 font-Manrope">
      <img src={IMAGES.horizontalLine} alt="" className="mx-auto" />
      <Container>
        <div className="flex flex-col gap-5 items-center text-center mt-20">
          <Badge label="Why Choose Vedic Wisdom" />
          <h1 className="heading">
            Ancient <span className="text-primary-10">Wisdom</span> <br />
            Modern <span className="text-primary-10">Intelligence.</span>
          </h1>
          <p className="description">
            Everything you need for spiritual growth, wellness, learning, and
            conscious living brought together in one beautifully designed
            experience.
          </p>

          <div className="flex gap-10 mt-10">
            <div className="bg-gradient-hero rounded-4xl p-0.5 w-[70%]">
              <div className="bg-neutral-45 rounded-4xl p-8 h-full">
                <div className="flex items-center justify-between gap-10">
                  <div className="space-y-2 text-left">
                    <div className="px-4 py-2 bg-primary-40 rounded-3xl text-primary-10 text-center font-semibold w-fit">
                      Our Purpose
                    </div>
                    <h2 className="text-neutral-40 font-semibold text-4xl">
                      Your Complete Sanatan Ecosystem
                    </h2>
                    <p className="text-neutral-50 text-lg font-medium">
                      Built for those who want to live every day in dharma.
                    </p>
                  </div>

                  <div className="bg-white border border-neutral-20 p-4 flex items-center justify-center rounded-2xl w-fit">
                    <img src={ICONS.om} alt="" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-20">
                  {purpose?.map((item) => (
                    <div
                      key={item?.id}
                      className="bg-white border border-neutral-20 p-4 flex items-center gap-3 rounded-2xl w-fit"
                    >
                      <img src={item?.icon} alt="" className="size-5" />
                      <p className="text-neutral-40 font-semibold">
                        {item?.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Counters */}
            <div className="space-y-6 w-[30%]">
              {counters?.map((item) => (
                <div
                  key={item?.id}
                  className="bg-gradient-hero rounded-4xl p-0.5"
                >
                  <div className="bg-neutral-45 rounded-4xl p-8 space-y-3 relative overflow-hidden">
                    <h2 className="text-primary-10 font-semibold text-[66px]">
                      {item?.value} <span className="text-neutral-40">+</span>
                    </h2>
                    <h3 className="text-neutral-40 font-semibold text-xl">
                      {item?.label}
                    </h3>
                    <div className="bg-primary-60 rounded-[300px] blur-[44px] absolute -right-21 -bottom-15 w-75 h-25"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-10">
            <div className="bg-gradient-hero rounded-4xl p-0.5">
              <div className="bg-neutral-45 rounded-4xl p-8 h-full">
                <div className="flex items-center justify-between gap-10">
                  <div className="space-y-2 text-left">
                    <div className="px-4 py-2 bg-primary-40 rounded-3xl text-primary-10 text-center font-semibold w-fit">
                      AI Real Guidance
                    </div>
                    <h2 className="text-neutral-40 font-semibold text-4xl">
                      Ask freely. Pure clarity.
                    </h2>
                  </div>

                  <div className="bg-white border border-neutral-20 p-4 flex items-center justify-center rounded-2xl w-fit">
                    <img src={ICONS.chatbot} alt="" />
                  </div>
                </div>

                <img src={IMAGES.aiGuide} alt="" className="mt-10" />
              </div>
            </div>

            <div className="bg-gradient-hero rounded-4xl p-0.5">
              <div className="bg-neutral-45 rounded-4xl p-8 h-full">
                <img src={IMAGES.aiGuide} alt="" />

                <div className="space-y-2 text-left mt-10">
                  <div className="px-4 py-2 bg-primary-40 rounded-3xl text-primary-10 text-center font-semibold w-fit">
                    Sacred Library
                  </div>
                  <h2 className="text-neutral-40 font-semibold text-4xl">
                    Every scripture,one tap away.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WhyChooseVedicWisdom;
