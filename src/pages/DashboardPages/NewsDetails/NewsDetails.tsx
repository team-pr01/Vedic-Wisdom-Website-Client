import NewsContent from "../../../components/Dashboard/NewsDetailsPage/NewsContent/NewsContent";
import TrendingNewsCard from "../../../components/Dashboard/NewsPage/TrendingNewsCard/TrendingNewsCard";
import Breadcrumb from "../../../components/Reusable/Breadcrumb/Breadcrumb";

const NewsDetails = () => {
  return (
    <div className="font-Manrope">
      <div className="flex gap-8">
        <div className="w-[60%]">
          <Breadcrumb
            items={[
              { label: "Dashboard", path: "/dashboard", isActive: true },
              {
                label: "News",
                path: "/dashboard/news",
                isActive: true,
              },
              {
                label: "News Details",
                path: "/dashboard/news/1",
                isActive: true,
              },
            ]}
          />
          <div className="space-y-5 mt-4">
           <NewsContent/>
          </div>
        </div>

        <div className="w-[40%] sticky top-5 h-fit">
          <h4 className="text-neutral-90 font-bold text-xl">Other News</h4>
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
    </div>
  );
};

export default NewsDetails;
