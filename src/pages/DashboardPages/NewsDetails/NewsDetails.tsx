import { useParams } from "react-router-dom";
import NewsContent from "../../../components/Dashboard/NewsDetailsPage/NewsContent/NewsContent";
import TrendingNewsCard from "../../../components/Dashboard/NewsPage/TrendingNewsCard/TrendingNewsCard";
import Breadcrumb from "../../../components/Reusable/Breadcrumb/Breadcrumb";
import {
  useGetAllTrendingNewsQuery,
  useGetSingleNewsQuery,
} from "../../../redux/Features/News/newsApi";
import type { TNews } from "../../../types/news.type";
import { useState } from "react";
import LogoLoader from "../../../components/Shared/LogoLoader/LogoLoader";

const NewsDetails = () => {
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const { data, isLoading, isFetching, error } = useGetSingleNewsQuery({
    id,
    languageCode: selectedLanguage,
  });
  const news = data?.data || {};
  const { data: trendingNews } = useGetAllTrendingNewsQuery({});
  const allTrendingNews =
    trendingNews?.data?.data?.filter((news: TNews) => news?._id !== id) || [];

  if (isLoading || isFetching) {
    return <LogoLoader />;
  }
  return (
    <div className="font-Manrope">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard", isActive: true },
          {
            label: "News",
            path: "/dashboard/news",
            isActive: true,
          },
          {
            label: news?.title,
            path: `/dashboard/news/${id}`,
            isActive: true,
          },
        ]}
      />

      <div className="flex gap-8 mt-8">
        <div className="space-y-5 w-[60%]">
          <NewsContent
            news={news}
            setSelectedLanguage={setSelectedLanguage}
            error={error}
          />
        </div>

        <div className="w-[40%] sticky top-5 h-fit">
          <h4 className="text-neutral-90 font-bold text-xl">
            Other Trending News
          </h4>
          <div className="flex flex-col gap-4 mt-4">
            {allTrendingNews?.map((item: TNews) => (
              <TrendingNewsCard key={item?._id} news={item} />
            ))}
          </div>
          {allTrendingNews?.length === 0 && (
            <h4 className="text-neutral-90">
              No trending news found at the moment.
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
