import { useState } from "react";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import { ICONS } from "../../../assets";
import NewsCard from "../../../components/Dashboard/NewsPage/NewsCard/NewsCard";
import TrendingNewsCard from "../../../components/Dashboard/NewsPage/TrendingNewsCard/TrendingNewsCard";
import Modal from "../../../components/Reusable/Modal/Modal";
import { IoSearchOutline } from "react-icons/io5";

const News = () => {
  const [isTranslateNewsModalOpen, setIsTranslateNewsModalOpen] =
    useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const newsCategories = [
    "All",
    "Spiritual",
    "Temple",
    "Community",
    "Announcements",
  ];
  return (
    <div className="font-Manrope space-y-8">
      <DashboardHeading
        title="Spiritual News"
        description="Explore our various spiritual news."
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {newsCategories?.map((category) => (
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
        <button
          onClick={() => setIsTranslateNewsModalOpen(true)}
          className="bg-white border border-neutral-55 rounded-lg flex items-center justify-center size-10 p-2"
        >
          <img src={ICONS.translate} alt="" />
        </button>
      </div>

      <div className="flex gap-8">
        <div className="w-[60%]">
          <h4 className="text-neutral-90 font-bold text-xl">Latest News</h4>
          <div className="space-y-5 mt-4">
            <NewsCard />
            <NewsCard />
            <NewsCard />
          </div>
        </div>

        <div className="w-[40%] sticky top-5 h-fit">
          <h4 className="text-neutral-90 font-bold text-xl">Trending News</h4>
          <div className="flex flex-col gap-4 mt-4">
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
            <TrendingNewsCard />
          </div>
        </div>
      </div>

      <Modal
        isModalOpen={isTranslateNewsModalOpen}
        setIsModalOpen={setIsTranslateNewsModalOpen}
      >
        <h2 className="text-neutral-90 text-xl font-bold">Select Language</h2>

        <div className="relative w-full mt-4">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-55"
            placeholder="Search by product name..."
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={() => setSelectedLanguage("Bangla")}
            className="w-full px-4 py-3.5 rounded-lg border bg-white hover:bg-primary-10 hover:text-white transition duration-300 border-neutral-55 text-left"
          >
            Bangla
          </button>
          <button
            onClick={() => setSelectedLanguage("English")}
            className="w-full px-4 py-3.5 rounded-lg border bg-white hover:bg-primary-10 hover:text-white transition duration-300 border-neutral-55 text-left"
          >
            English
          </button>
          <button
            onClick={() => setSelectedLanguage("Hindi")}
            className="w-full px-4 py-3.5 rounded-lg border bg-white hover:bg-primary-10 hover:text-white transition duration-300 border-neutral-55 text-left"
          >
            Hindi
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default News;
