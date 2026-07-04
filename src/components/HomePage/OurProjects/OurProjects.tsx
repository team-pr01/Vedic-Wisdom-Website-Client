import { ICONS, IMAGES } from "../../../assets";
import Badge from "../../Reusable/Badge/Badge";
import Container from "../../Reusable/Container/Container";
import ProjectCard from "./ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const OurProjects = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const projects = [
    {
      _id: 1,
      title: "Spiritual Learning...",
      description: "Spreading authentic Shanthan knowledge",
      image: IMAGES.dummyProject,
    },
    {
      _id: 2,
      title: "Spiritual Learning...",
      description: "Spreading authentic Shanthan knowledge",
      image: IMAGES.dummyProject,
    },
    {
      _id: 3,
      title: "Spiritual Learning...",
      description: "Spreading authentic Shanthan knowledge",
      image: IMAGES.dummyProject,
    },
    {
      _id: 4,
      title: "Spiritual Learning...",
      description: "Spreading authentic Shanthan knowledge",
      image: IMAGES.dummyProject,
    },
    {
      _id: 5,
      title: "Spiritual Learning...",
      description: "Spreading authentic Shanthan knowledge",
      image: IMAGES.dummyProject,
    },
  ];

  const totalDots = Math.max(
    projects.length - slidesPerView + 1,
    1
  );

  return (
    <div className="py-23 font-Manrope">
      <img src={IMAGES.horizontalLine} alt="" className="mx-auto" />

      <Container>
        <div className="flex flex-col gap-5 items-center text-center mt-20">
          <Badge label="Our Projects" />

          <h1 className="heading">
            Building <span className="text-primary-10">Real-World</span>
            <br />
            Impact Through <span className="text-primary-10">Vedic.</span>
          </h1>

          <p className="description">
            Supporting Vedic knowledge, education, and communities through open,
            donation-driven initiatives.
          </p>

          <div className="w-full mt-15 relative">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={3}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setSlidesPerView(Number(swiper.params.slidesPerView));
              }}
              onBreakpoint={(swiper) => {
                setSlidesPerView(Number(swiper.params.slidesPerView));
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 25,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {projects?.map((project) => (
                <SwiperSlide key={project?._id}>
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-10">
              {/* Previous */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="bg-neutral-30 hover:bg-primary-10/20 transition duration-300 border border-neutral-20 rounded-md px-3 py-2 flex items-center justify-center"
              >
                <img
                  src={ICONS.arrowRight}
                  alt="Previous"
                  className="size-5 rotate-180"
                />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalDots }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => swiperRef.current?.slideTo(index)}
                    className={`transition-all duration-300 rounded-full ${
                      activeIndex === index
                        ? "w-6 h-2.5 bg-primary-10"
                        : "w-2.5 h-2.5 bg-neutral-60/60 hover:bg-neutral-40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="bg-neutral-30 hover:bg-primary-10/20 transition duration-300 border border-neutral-20 rounded-md px-3 py-2 flex items-center justify-center"
              >
                <img
                  src={ICONS.arrowRight}
                  alt="Next"
                  className="size-5"
                />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OurProjects;