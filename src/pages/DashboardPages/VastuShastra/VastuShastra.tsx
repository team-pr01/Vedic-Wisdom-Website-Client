import { useRef, useState } from "react";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ICONS } from "../../../assets";
import AvailableExperts from "../../../components/Reusable/AvailableExperts/AvailableExperts";
import VastuShastraVideoCard from "../../../components/Dashboard/VastuShastraPage/VastuShastraVideoCard/VastuShastraVideoCard";
import PopularVastuTips from "../../../components/Dashboard/VastuShastraPage/PopularVastuTips/PopularVastuTips";
import { useGetAllVastuQuery } from "../../../redux/Features/Vastu/vastuApi";
import type { TVastu } from "../../../types/vastu.type";
import { useGetAllCategoriesByAreaNameQuery } from "../../../redux/Features/Categories/ReelCategory/categoriesApi";
import type { TCategories } from "../../../types/categories.interface";

const VastuShastra = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { data: categories } = useGetAllCategoriesByAreaNameQuery("vastu");
  const vastuCategories = [
    "All",
    ...(categories?.data?.map((category: TCategories) => category?.category) ||
      []),
  ];

  const { data } = useGetAllVastuQuery({ category: selectedCategory });
  const allVastu = data?.data?.vastu || [];
  return (
    <div className="font-Manrope space-y-8">
      <DashboardHeading
        title="Vastu Shastra"
        description="Create cosmic harmony in your physical environment."
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {vastuCategories?.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-3xl border border-primary-80  hover:bg-primary-10 hover:text-white transition duration-300 text-sm ${
                selectedCategory === category
                  ? "bg-primary-10 text-white"
                  : "bg-white text-neutral-40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Navigation */}
        <div className="flex items-center justify-center gap-3">
          {/* Previous */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-neutral-30 hover:bg-primary-10/20 transition duration-300 border border-neutral-50/20 size-10 rounded-full flex items-center justify-center"
          >
            <img
              src={ICONS.arrowRight}
              alt="Previous"
              className="size-5 rotate-180"
            />
          </button>

          {/* Next */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-neutral-30 hover:bg-primary-10/20 transition duration-300 border border-neutral-50/20 size-10 rounded-full flex items-center justify-center"
          >
            <img src={ICONS.arrowRight} alt="Next" className="size-5" />
          </button>
        </div>
      </div>

      <div className="w-full mt-6 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={4.5}
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
              slidesPerView: 4.3,
              spaceBetween: 30,
            },
          }}
        >
          {allVastu?.map((vastu: TVastu) => (
            <SwiperSlide key={vastu?._id}>
              <VastuShastraVideoCard vastu={vastu} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <PopularVastuTips />
      <AvailableExperts areaOfExpertise="Vastu" />
    </div>
  );
};

export default VastuShastra;
