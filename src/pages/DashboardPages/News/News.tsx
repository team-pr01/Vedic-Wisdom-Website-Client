import { useState } from "react";
import DashboardHeading from "../../../components/Reusable/DashboardHeading/DashboardHeading";
import NewsCard from "../../../components/Dashboard/NewsPage/NewsCard/NewsCard";
import TrendingNewsCard from "../../../components/Dashboard/NewsPage/TrendingNewsCard/TrendingNewsCard";
import {
  useGetAllNewsQuery,
  useGetAllTrendingNewsQuery,
} from "../../../redux/Features/News/newsApi";
import type { TNews } from "../../../types/news.type";
import LogoLoader from "../../../components/Shared/LogoLoader/LogoLoader";
import { FaFire, FaSearch, FaExclamationCircle } from "react-icons/fa";

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { data, isLoading, isFetching } = useGetAllNewsQuery({
    category: selectedCategory,
  });
  const { data: trendingNews, isLoading: isTrendingLoading } =
    useGetAllTrendingNewsQuery({});
  const allTrendingNews = trendingNews?.data?.data || [];
  const news = data?.data?.news || [];

  const newsCategories = [
    "All",
    "Spiritual",
    "Temple",
    "Community",
    "Announcements",
  ];

  if (isLoading || isFetching || isTrendingLoading) {
    return <LogoLoader />;
  }

  return (
    <div className="font-Manrope space-y-8">
      <DashboardHeading
        title="Spiritual News"
        description="Explore our various spiritual news."
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          {newsCategories?.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-3xl border border-primary-80 hover:bg-primary-10 hover:text-white transition duration-300 text-sm ${
                selectedCategory === category
                  ? "bg-primary-10 text-white"
                  : "bg-white text-neutral-40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Latest News Section */}
        <div className="w-full lg:w-[60%]">
          <h4 className="text-neutral-90 font-bold text-xl">Latest News</h4>
          <div className="space-y-5 mt-4">
            {news?.length > 0 ? (
              news?.map((item: TNews) => (
                <NewsCard key={item?._id} news={item} />
              ))
            ) : (
              <div className="mt-12 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-neutral-10/10 flex items-center justify-center mb-4">
                    <FaSearch className="text-4xl text-neutral-30" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-90">
                    No News Found
                  </h4>
                  <p className="text-sm text-neutral-60 mt-2 max-w-sm">
                    {selectedCategory === "All"
                      ? "There are no news articles available at the moment. Please check back later."
                      : `No news found in the "${selectedCategory}" category. Try selecting a different category.`}
                  </p>
                  {selectedCategory !== "All" && (
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className="mt-4 text-primary-10 text-sm font-medium hover:underline"
                    >
                      View all news
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trending News Section */}
        <div className="w-full lg:w-[40%] sticky top-5 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <FaFire className="text-orange-500" />
            <h4 className="text-neutral-90 font-bold text-xl">Trending News</h4>
          </div>

          {allTrendingNews?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {allTrendingNews?.map((item: TNews) => (
                <TrendingNewsCard key={item?._id} news={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-neutral-20 rounded-2xl p-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-3">
                  <FaExclamationCircle className="text-2xl text-orange-400" />
                </div>
                <h5 className="text-sm font-semibold text-neutral-90">
                  No Trending News
                </h5>
                <p className="text-xs text-neutral-60 mt-1">
                  No trending news available at the moment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
