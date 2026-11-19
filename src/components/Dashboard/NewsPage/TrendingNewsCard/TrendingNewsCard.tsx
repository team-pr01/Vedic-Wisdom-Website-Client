import { ICONS } from "../../../../assets";
import type { TNews } from "../../../../types/news.type";
import { formatDate } from "../../../../utils/formatDate";
import { Link } from "react-router-dom";

const TrendingNewsCard = ({ news }: { news: TNews }) => {
  const overview =
    news?.overview && news.overview.length > 80
      ? news.overview.slice(0, 80).trimEnd() + "..."
      : news?.overview || "";

  return (
    <div className="bg-white border border-primary-80 rounded-xl flex items-stretch gap-2.5 sm:gap-3 p-2 pr-3 sm:pr-4">
      <img
        src={news?.imageUrl}
        alt=""
        className="rounded-lg w-24 sm:w-32 md:w-40 h-auto object-cover shrink-0"
      />
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h4 className="text-neutral-90 font-bold text-sm sm:text-base md:text-lg line-clamp-2">
            {news?.title}
          </h4>
          <p className="text-neutral-10 text-xs sm:text-sm mt-1 line-clamp-2">
            {overview}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-2 w-full">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="hidden md:flex items-center gap-1.5 shrink-0">
              <img src={ICONS.calendar} alt="" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <p className="text-neutral-90 text-[11px] sm:text-xs whitespace-nowrap">
                {formatDate(news?.createdAt)}
              </p>
            </div>

            <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-neutral-70 rounded text-primary-10 text-[11px] sm:text-xs w-fit shrink-0 truncate max-w-22.5 sm:max-w-none">
              {news?.category}
            </div>
          </div>

          <Link
            to={`/dashboard/news/${news?._id}`}
            className="flex items-center gap-1 sm:gap-1.5 shrink-0"
          >
            <p className="text-neutral-5 text-xs sm:text-sm font-semibold whitespace-nowrap">
              Read More
            </p>
            <img src={ICONS.arrowRight} alt="" className="w-3.5 sm:w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingNewsCard;