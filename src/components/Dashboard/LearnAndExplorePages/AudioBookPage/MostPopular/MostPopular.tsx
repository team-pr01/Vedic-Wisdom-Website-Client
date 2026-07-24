import { useEffect, useRef } from "react";
import { useGetPopularAudioBooksQuery } from "../../../../../redux/Features/AudioBook/audioBookApi";
import { ICONS } from "../../../../../assets";
import AudioBookCardSkeleton from "../../../../SkeletonLoaders/AudioBookCardSkeleton/AudioBookCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { TAudioBook } from "../../../../../types/audioBook.type";
import AudioBookCard from "../AudioBookCard/AudioBookCard";

const MostPopular = () => {
  const { data: popularBooks, isLoading: isPopularLoading } =
    useGetPopularAudioBooksQuery({});
  const popularAudioBooks = popularBooks?.data?.audioBooks || [];
  const swiperRef = useRef<SwiperType | null>(null);
  const popularSkeletonCount = 6;

  // Update navigation on render
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [popularAudioBooks]);
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-neutral-90 font-bold text-xl capitalize">
          Most Popular
        </h4>
        {/* Navigation */}
        <div className="flex items-center justify-center gap-3">
          {/* Previous */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-neutral-30 hover:bg-primary-10/20 transition duration-300 border border-neutral-50/20 p-2 rounded-lg flex items-center justify-center"
          >
            <img
              src={ICONS.arrowRight}
              alt="Previous"
              className="size-4 rotate-180"
            />
          </button>

          {/* Next */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-neutral-30 hover:bg-primary-10/20 transition duration-300 border border-neutral-50/20 p-2 rounded-lg flex items-center justify-center"
          >
            <img src={ICONS.arrowRight} alt="Next" className="size-4" />
          </button>
        </div>
      </div>

      {isPopularLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-3">
          {Array.from({ length: popularSkeletonCount }).map((_, index) => (
            <AudioBookCardSkeleton key={`new-${index}`} />
          ))}
        </div>
      ) : (
        <div className="w-full relative mt-3">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
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
                slidesPerView: 5.7,
                spaceBetween: 30,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="overflow-visible!"
          >
            {popularAudioBooks?.map((audioBook: TAudioBook) => (
              <SwiperSlide key={audioBook?._id}>
                <AudioBookCard key={audioBook?._id} book={audioBook} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default MostPopular;
