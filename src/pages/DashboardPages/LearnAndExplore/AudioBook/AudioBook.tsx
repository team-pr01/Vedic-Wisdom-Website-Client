import { IoSearchOutline } from "react-icons/io5";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import { useState } from "react";
import AudioBookCard from "../../../../components/Dashboard/LearnAndExplorePages/AudioBookPage/AudioBookCard/AudioBookCard";
import { ICONS } from "../../../../assets";
import {
  useGetAllAudioBooksQuery,
  useGetNewArrivalAudioBooksQuery,
  useGetPopularAudioBooksQuery,
} from "../../../../redux/Features/AudioBook/audioBookApi";
import type { TAudioBook } from "../../../../types/audioBook.type";

const AudioBook = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data: otherBooks } = useGetAllAudioBooksQuery({ keyword });
  const { data: newArrivalBooks } = useGetNewArrivalAudioBooksQuery({});
  const { data: popularBooks } = useGetPopularAudioBooksQuery({});
  const otherAudioBooks = otherBooks?.data?.audioBooks || [];
  const newArrivalAudioBooks = newArrivalBooks?.data?.audioBooks || [];
  const popularAudioBooks = popularBooks?.data?.audioBooks || [];

  return (
    <div className="font-Manrope space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <DashboardHeading
          title="Audio Books"
          description="Explore our various spiritual audio books."
        />
        <div className="relative w-full sm:w-80 lg:w-100">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-55"
            placeholder="e.g. Bhagavad Gita"
            value={keyword}
          />
        </div>
      </div>

      <div>
        <h4 className="text-neutral-90 font-bold text-xl capitalize">
          New Arrivals
        </h4>
        <div className="grid grid-cols-4 gap-4 mt-3 relative">
          {newArrivalAudioBooks?.map((audioBook: TAudioBook) => (
            <AudioBookCard
              key={audioBook?._id}
              book={audioBook}
              direction="row"
            />
          ))}

          <div className="w-13 bg-white backdrop-blur-3xl h-full absolute right-0">
            <button
              // onClick={() => swiperRef.current?.slidePrev()}
              className="bg-neutral-30 size-10 rounded-full hover:bg-primary-10/20 transition duration-300 border border-neutral-55 p-2 flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2"
            >
              <img src={ICONS.arrowRight} alt="Previous" className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-neutral-90 font-bold text-xl capitalize">
          Most Popular
        </h4>
        <div className="grid grid-cols-6 gap-4 mt-3 relative">
          {popularAudioBooks?.map((audioBook: TAudioBook) => (
            <AudioBookCard key={audioBook?._id} book={audioBook} />
          ))}

          <div className="w-13 bg-white backdrop-blur-3xl h-full absolute right-0">
            <button
              // onClick={() => swiperRef.current?.slidePrev()}
              className="bg-neutral-30 size-10 rounded-full hover:bg-primary-10/20 transition duration-300 border border-neutral-55 p-2 flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2"
            >
              <img src={ICONS.arrowRight} alt="Previous" className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-neutral-90 font-bold text-xl capitalize">
          People Also Like
        </h4>
        <div className="grid grid-cols-6 gap-4 mt-3">
          {otherAudioBooks?.map((audioBook: TAudioBook) => (
            <AudioBookCard key={audioBook?._id} book={audioBook} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioBook;
