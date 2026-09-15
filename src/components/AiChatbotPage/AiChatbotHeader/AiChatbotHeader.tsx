/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { ICONS } from "../../../assets";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SearchChatsModal from "./SearchChatsModal/SearchChatsModal";

const AiChatbotHeader = () => {
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Spiritual AI Assistant",
      text: "Chat with me on the Spiritual AI Assistant",
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } else {
        toast.error("Sharing is not supported on this device");
      }
    } catch (error: any) {
      if (error?.name === "AbortError") {
        return;
      }
      console.error("Share failed:", error);
      toast.error("Failed to share");
    }
  };

  return (
    <>
      <header className="h-20 bg-white border-b border-neutral-75 flex items-center justify-between px-10">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)}>
            <img src={ICONS.arrowLeft} alt="" className="w-5" />
          </button>
          <h2 className="font-bold text-xl text-neutral-90">
            Spiritual AI Assistant
          </h2>
        </div>

        <div className="flex items-center gap-5">
          {/* Search Trigger */}
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-80"
              size={16}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              onClick={() => setIsSearchModalOpen(true)}
              readOnly
              className="bg-neutral-20 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-30 w-72 transition-all cursor-pointer"
            />
          </div>

          <button className="p-3 text-neutral-5 bg-[#f6f6f6] rounded-xl transition-colors flex items-center gap-1 text-sm">
            <img src={ICONS.crown} alt="" className="w-5" />
            Upgrade to Pro
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-3 text-neutral-5 bg-[#f6f6f6] rounded-xl transition-colors hover:bg-neutral-30 flex items-center gap-1 text-sm"
          >
            <img src={ICONS.shareGray} alt="" className="w-6" />
            Share
          </button>
        </div>
      </header>

      {/* Search Modal */}
      <SearchChatsModal
        isModalOpen={isSearchModalOpen}
        setIsModalOpen={setIsSearchModalOpen}
      />
    </>
  );
};

export default AiChatbotHeader;
