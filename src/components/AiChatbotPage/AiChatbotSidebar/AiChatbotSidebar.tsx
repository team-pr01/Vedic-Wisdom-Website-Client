import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";

const AiChatbotSidebar = () => {
  return (
    <aside className="w-72 bg-neutral-90 flex flex-col p-4 text-white">
      {/* Logo */}
      <Link to="/" className="bg-white rounded-2xl p-2">
        <img src={IMAGES.logo} alt="" className="mb-1" />
      </Link>

      {/* Sidebar Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar mt-10">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-neutral-91 rounded-full text-white font-medium mb-6">
          <img src={ICONS.plusWhite} alt="" className="w-5" />
          New Chat
        </button>

        {/* Recent History Section */}
        <div className="mt-10 space-y-4">
          <p className="text-neutral-60 text-xs font-bold px-3">
            Recent History
          </p>
          <div className="">
            <HistoryItem title="Create welcome form" active />
            <HistoryItem title="Setup Wi-Fi network" />
            <HistoryItem title="Career productivity" />
          </div>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto pt-4 border-t border-[#ffffff10]">
        {/* Pro Card */}
        <div className="bg-neutral-55 border-primary-50 p-4 shadow-hero-user-community-box flex flex-col justify-between rounded-2xl relative group text-left">
          <div className="z-10 relative">
            <h2
              className={`text-neutral-90 transition duration-300 text-xl font-semibold`}
            >
              Unlock 30% Premium Discount
            </h2>
            <p className="description text-sm mt-2">
              Invite 2 Friends & Unlock 30% Premium Discount.
            </p>

            <Button label="Get Started" className="w-full py-2 mt-4" />
          </div>
          <img
            src={IMAGES.appFeatureGradient}
            alt=""
            className={`absolute top-0 rotate-180 rounded-2xl left-0 right-0 opacity-100 transition duration-300 w-full h-full z-0`}
          />
        </div>

        <button className="flex items-center gap-3 px-4 py-3 text-[#8F8F8F] hover:text-white transition-colors w-full rounded-xl hover:bg-[#ffffff08]">
          <FiLogOut size={18} />
          <span className="font-medium text-sm">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default AiChatbotSidebar;

const HistoryItem = ({ title, active = false }) => (
  <button
    className={`w-full text-left p-3 rounded-2xl transition-all text-sm border ${active ? "bg-[#ffffff10] text-primary-20 border-neutral-50/50" : "text-neutral-60 border-transparent hover:bg-neutral-91"}`}
  >
    {title}
  </button>
);
