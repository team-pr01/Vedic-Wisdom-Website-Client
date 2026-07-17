import { ICONS } from "../../../../assets";
import type { TNews } from "../../../../types/news.type";
import { formatDate } from "../../../../utils/formatDate";
import { Link } from "react-router-dom";

const TrendingNewsCard = ({ news }: { news: TNews }) => {
  return (
    <div className="bg-white border border-primary-80 rounded-xl flex items-center gap-3 p-2 pr-4">
      <img
        src={news?.imageUrl}
        alt=""
        className="rounded-lg w-40 h-full object-cover"
      />
      <div>
        <h4 className="text-neutral-90 font-bold text-">{news?.title}</h4>
        <p className="text-neutral-10 text-sm mt-1">
          {news?.overview.slice(0, 80).concat("...")}
        </p>

        <div className="flex items-center justify-between mt-2 w-full">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <img src={ICONS.calendar} alt="" />
              <p className="text-neutral-90 text-xs">
                {formatDate(news?.createdAt)}
              </p>
            </div>

            <div className="px-2 py-1 bg-neutral-70 rounded text-primary-10 text-xs w-fit">
              {news?.category}
            </div>
          </div>

          <Link
            to={`/dashboard/news/${news?._id}`}
            className="flex items-center gap-1.5"
          >
            <p className="text-neutral-5 text-sm font-semibold">Read More</p>
            <img src={ICONS.arrowRight} alt="" className="w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingNewsCard;
