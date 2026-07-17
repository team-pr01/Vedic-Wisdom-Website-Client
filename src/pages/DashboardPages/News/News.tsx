import { useState } from "react";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import { ICONS } from "../../../assets";
import NewsCard from "../../../components/Dashboard/NewsPage/NewsCard/NewsCard";
import TrendingNewsCard from "../../../components/Dashboard/NewsPage/TrendingNewsCard/TrendingNewsCard";
import SelectSystemLanguage from "../../../components/Shared/SelectSystemLanguage/SelectSystemLanguage";
import {
  useGetAllNewsQuery,
  useGetAllTrendingNewsQuery,
} from "../../../redux/Features/News/newsApi";
import type { TNews } from "../../../types/news.type";

const News = () => {
  const { data } = useGetAllNewsQuery({});
  const { data: trendingNews } = useGetAllTrendingNewsQuery({});
  const allTrendingNews = trendingNews?.data?.data || [];
  console.log(trendingNews);
  const news = data?.data?.news || [];
  const [isTranslateNewsModalOpen, setIsTranslateNewsModalOpen] =
    useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

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
            {news?.map((item: TNews) => (
              <NewsCard key={item?._id} news={item} />
            ))}
          </div>
        </div>

        <div className="w-[40%] sticky top-5 h-fit">
          <h4 className="text-neutral-90 font-bold text-xl">Trending News</h4>
          <div className="flex flex-col gap-4 mt-4">
            {allTrendingNews?.map((item: TNews) => (
              <TrendingNewsCard key={item?._id} news={item} />
            ))}
          </div>
        </div>
      </div>

      <SelectSystemLanguage
        isModalOpen={isTranslateNewsModalOpen}
        setIsModalOpen={setIsTranslateNewsModalOpen}
        setSelectedLanguage={setSelectedLanguage}
      />
    </div>
  );
};

export default News;
