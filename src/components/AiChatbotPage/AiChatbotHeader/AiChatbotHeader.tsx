import { FiSearch } from "react-icons/fi";
import { ICONS } from "../../../assets";
import { useNavigate } from "react-router-dom";

const AiChatbotHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="h-20 bg-white border-b border-[#DEDEDE] flex items-center justify-between px-10">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <img src={ICONS.arrowLeft} alt="" className="w-5" />
        </button>
        <h2 className="font-bold text-xl text-[#1C2542]">
          Spiritual AI Assistant
        </h2>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8F8F8F]"
            size={16}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            className="bg-[#f3f3f3] border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#ffb72f] w-72 transition-all"
          />
        </div>
        <button className="p-3 text-neutral-5 bg-[#f6f6f6] rounded-xl transition-colors flex items-center gap-1 text-sm">
          <img src={ICONS.crown} alt="" className="w-5" />
          Upgrade to Pro
        </button>
        <button className="p-3 text-neutral-5 bg-[#f6f6f6] rounded-xl transition-colors flex items-center gap-1 text-sm">
          <img src={ICONS.shareGray} alt="" className="w-6" />
          Share
        </button>
      </div>
    </header>
  );
};

export default AiChatbotHeader;
