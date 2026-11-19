import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { ICONS, IMAGES } from "../../../../assets";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/formatDate";
import { useToggleLikeNewsMutation } from "../../../../redux/Features/News/newsApi";
import { useSelector } from "react-redux";
import {
  useCurrentUser,
  type TLoggedInUser,
} from "../../../../redux/Features/Auth/authSlice";
import { useState } from "react";
import type { TNews } from "../../../../types/news.type";

const NewsCard = ({ news }: { news: TNews }) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [toggleLikeNews] = useToggleLikeNewsMutation();
  const [isLiked, setIsLiked] = useState(
    news?.likedBy?.some((id: string) => id === user?._id) || false,
  );
  const [likesCount, setLikesCount] = useState(news?.likes || 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (!user) {
      console.log("Please login to like");
      return;
    }

    const previousIsLiked = isLiked;
    const previousLikesCount = likesCount;

    setIsLiked(!isLiked);
    setLikesCount((prev: number) => (isLiked ? prev - 1 : prev + 1));
    setIsLoading(true);

    try {
      const response = await toggleLikeNews(news?._id).unwrap();
      if (!response?.success) {
        setIsLiked(previousIsLiked);
        setLikesCount(previousLikesCount);
        console.error("Failed to toggle like:", response);
      }
    } catch (error) {
      setIsLiked(previousIsLiked);
      setLikesCount(previousLikesCount);
      console.error("Failed to toggle like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-primary-80 rounded-xl flex flex-col">
      <img
        src={news?.imageUrl || IMAGES.imagePlaceholder}
        alt=""
        className="w-full rounded-t-xl object-cover aspect-video"
      />
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <h4 className="text-neutral-90 font-bold text-lg md:text-xl line-clamp-2">
          {news?.title}
        </h4>
        <p className="text-neutral-10 text-sm 3xl:text-base mt-1 line-clamp-2">
          {news?.overview}
        </p>

        {/* Meta + actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mt-4 md:mt-4">
          {/* Row 1: date + category */}
          <div className="flex items-center justify-between md:justify-start gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5">
              <img src={ICONS.calendar} alt="" className="shrink-0" />
              <p className="text-neutral-90 text-sm whitespace-nowrap">
                {formatDate(news?.createdAt)}
              </p>
            </div>

            <div className="px-2 py-1 bg-neutral-70 rounded text-primary-10 text-sm w-fit shrink-0">
              {news?.category}
            </div>
          </div>

          {/* Row 2 (mobile) / right group (desktop): like + read more */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-neutral-55/40">
            <button
              onClick={handleLike}
              disabled={isLoading}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {isLiked ? (
                <IoHeart className="text-xl text-primary-10" />
              ) : (
                <IoHeartOutline className="text-xl text-primary-10" />
              )}
              <p className="text-neutral-90 text-sm">{likesCount}</p>
            </button>

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
    </div>
  );
};

export default NewsCard;