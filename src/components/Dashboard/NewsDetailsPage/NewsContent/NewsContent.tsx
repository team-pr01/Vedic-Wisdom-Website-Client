/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { ICONS } from "../../../../assets";
import type { TNews } from "../../../../types/news.type";
import { formatDate } from "../../../../utils/formatDate";
import { useSelector } from "react-redux";
import {
  useCurrentUser,
  type TLoggedInUser,
} from "../../../../redux/Features/Auth/authSlice";
import { useToggleLikeNewsMutation } from "../../../../redux/Features/News/newsApi";
import { useState, useEffect } from "react";
import SelectSystemLanguage from "../../../Shared/SelectSystemLanguage/SelectSystemLanguage";
import { toast } from "react-hot-toast";

const NewsContent = ({
  news,
  setSelectedLanguage,
  error,
}: {
  news: TNews;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  error: any;
}) => {
  const errorMessage = error?.data?.message as any;
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [toggleLikeNews] = useToggleLikeNewsMutation();
  const [isLiked, setIsLiked] = useState(
    news?.likedBy?.some((id: string) => id === user?._id) || false,
  );
  const [likesCount, setLikesCount] = useState<number>(news?.likes || 0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTranslateNewsModalOpen, setIsTranslateNewsModalOpen] =
    useState<boolean>(false);
  const [translationError, setTranslationError] = useState<string>("");

  // Handle translation error
  useEffect(() => {
    if (error) {
      const message =
        error?.data?.message ||
        "Translation not available for your selected language";
      setTranslationError(message);
    }
  }, [error]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like");
      return;
    }

    // Optimistic update - immediate UI feedback
    const previousIsLiked = isLiked;
    const previousLikesCount = likesCount;

    setIsLiked(!isLiked);
    setLikesCount((prev: number) => (isLiked ? prev - 1 : prev + 1));
    setIsLoading(true);

    try {
      const response = await toggleLikeNews(news?._id).unwrap();

      if (!response?.success) {
        // Revert if API fails
        setIsLiked(previousIsLiked);
        setLikesCount(previousLikesCount);
        toast.error("Failed to like");
        console.error("Failed to toggle like:", response);
      }
    } catch (error) {
      // Revert on error
      setIsLiked(previousIsLiked);
      setLikesCount(previousLikesCount);
      toast.error("Failed to toggle like");
      console.error("Failed to toggle like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: news?.title || "Check this out!",
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Share failed:", error);
        toast.error("Failed to share");
      }
    }
  };

  const handleTranslateClick = () => {
    setTranslationError(""); // Clear previous error
    setIsTranslateNewsModalOpen(true);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h4 className="text-neutral-90 font-bold text-2xl w-[90%]">
          {news?.title}
        </h4>
        <button
          onClick={handleTranslateClick}
          className="bg-white border border-neutral-55 rounded-lg flex items-center justify-center size-10 p-2 hover:bg-neutral-10/5 transition-colors"
          title="Translate this article"
        >
          <img src={ICONS.translate} alt="Translate" />
        </button>
      </div>

      <img
        src={news?.imageUrl}
        alt=""
        className="w-full rounded-xl h-100 object-cover mt-3"
      />

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <img src={ICONS.calendar} alt="" />
            <p className="text-neutral-90 text-sm">
              {formatDate(news?.createdAt)}
            </p>
          </div>

          <div className="px-2 py-1 bg-neutral-70 rounded text-primary-10 text-sm w-fit">
            {news?.category}
          </div>
        </div>

        <div className="flex items-center gap-3">
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
          <button
            onClick={handleShare}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            title="Share"
          >
            <img src={ICONS.share} alt="Share" />
          </button>
        </div>
      </div>

      {/* Translation Error Message */}
      {translationError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-2">
          <span className="text-lg">⚠️</span>
          <div>
            <p className="font-semibold">Translation Error</p>
            <p className="text-red-500">{errorMessage}</p>
          </div>
          <button
            onClick={() => setTranslationError("")}
            className="ml-auto text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      )}

      {/* Display original content or translated content */}
      {!translationError && (
        <>
          <p className="text-neutral-10 text-sm 3xl:text-base mt-6">
            {news?.overview}
          </p>

          <div
            className="text-neutral-10 text-sm 3xl:text-base mt-6"
            dangerouslySetInnerHTML={{ __html: news?.content }}
          />
        </>
      )}

      {/* Show translated content if available */}
      {news?.translatedContent && !translationError && (
        <div className="mt-6 p-4 bg-primary-10/5 border border-primary-10/20 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <img src={ICONS.translate} alt="" className="w-4 h-4" />
            <span className="text-sm font-semibold text-primary-10">
              Translated Content
            </span>
          </div>
          <div
            className="text-neutral-10 text-sm 3xl:text-base"
            dangerouslySetInnerHTML={{ __html: news?.translatedContent }}
          />
        </div>
      )}

      <SelectSystemLanguage
        isModalOpen={isTranslateNewsModalOpen}
        setIsModalOpen={setIsTranslateNewsModalOpen}
        setSelectedLanguage={setSelectedLanguage}
      />
    </div>
  );
};

export default NewsContent;
