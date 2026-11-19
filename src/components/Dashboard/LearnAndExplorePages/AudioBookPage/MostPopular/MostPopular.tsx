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

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [popularAudioBooks]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-neutral-90 font-bold text-lg sm:text-xl capitalize truncate min-w-0">
          Most Popular
        </h4>

        <div className="flex items-center justify-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-neutral-30 hover:bg-primary-10/20 transition duration-300 border border-neutral-50/20 p-2 rounded-lg flex items-center justify-center"
            aria-label="Previous"
          >
            <img
              src={ICONS.arrowRight}
              alt="Previous"
              className="size-4 rotate-180"
            />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-neutral-30 hover:bg-primary-10/20 transition duration-300 border border-neutral-50/20 p-2 rounded-lg flex items-center justify-center"
            aria-label="Next"
          >
            <img src={ICONS.arrowRight} alt="Next" className="size-4" />
          </button>
        </div>
      </div>

      {isPopularLoading ? (
        /* Skeleton matches carousel breakpoints so no layout jump */
        <div className="mt-3">
          <div className="flex gap-4 sm:gap-5 lg:gap-7 overflow-hidden">
            {Array.from({ length: popularSkeletonCount }).map((_, index) => (
              <div
                key={`popular-skeleton-${index}`}
                className="shrink-0 w-full sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-8.4rem)/5.7)]"
              >
                <AudioBookCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full relative mt-3">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4.7,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4.7,
                spaceBetween: 30,
              },
              1440: {
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
                <AudioBookCard book={audioBook} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default MostPopular;