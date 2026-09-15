/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import { useGetMyChatHistoryQuery } from "../../../redux/Features/Rag/aiChatApi";

const AiChatbotSidebar = () => {
  const pathname = useLocation().pathname;
  const { data } = useGetMyChatHistoryQuery({});
  const chats = data?.data?.data || [];

  // ========== GROUP CHATS BY DATE ==========
  const groupChatsByDate = (chats: any[]) => {
    const groups: { [key: string]: any[] } = {};

    chats.forEach((chat) => {
      const date = new Date(chat.createdAt);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let dateKey: string;

      // Check if it's today
      if (date.toDateString() === today.toDateString()) {
        dateKey = "Today";
      } 
      // Check if it's yesterday
      else if (date.toDateString() === yesterday.toDateString()) {
        dateKey = "Yesterday";
      } 
      // Check if it's within the last 7 days
      else {
        const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 7) {
          // Get day name (Monday, Tuesday, etc.)
          dateKey = date.toLocaleDateString('en-US', { weekday: 'long' });
        } else {
          // Format as "August 5, 2026"
          dateKey = date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          });
        }
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(chat);
    });

    // Sort groups by date (newest first)
    const dateOrder: { [key: string]: number } = {
      'Today': 0,
      'Yesterday': 1,
    };

    // Get sorted keys
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      // If both are in dateOrder, use the order
      if (dateOrder[a] !== undefined && dateOrder[b] !== undefined) {
        return dateOrder[a] - dateOrder[b];
      }
      if (dateOrder[a] !== undefined) return -1;
      if (dateOrder[b] !== undefined) return 1;

      // For weekday names, sort by actual date
      const dateA = groups[a][0]?.createdAt ? new Date(groups[a][0].createdAt) : new Date(0);
      const dateB = groups[b][0]?.createdAt ? new Date(groups[b][0].createdAt) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    return sortedKeys.map(key => ({
      date: key,
      chats: groups[key]
    }));
  };

  const groupedChats = groupChatsByDate(chats);

  // ========== FORMAT DATE HEADER ==========
  const formatDateHeader = (dateKey: string): string => {
    // If it's a day name (Monday, Tuesday, etc.)
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (dayNames.includes(dateKey)) {
      return dateKey;
    }
    // If it's "Today" or "Yesterday"
    if (dateKey === 'Today' || dateKey === 'Yesterday') {
      return dateKey;
    }
    // If it's a formatted date like "August 5, 2026"
    return dateKey;
  };

  return (
    <aside className="hidden w-72 md:flex flex-col p-4 text-white">
      {/* Logo */}
      <Link to="/" className="bg-white rounded-2xl p-2">
        <img src={IMAGES.logo} alt="" className="mb-1" />
      </Link>

      {/* Sidebar Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto ai-chatbot-sidebar-scrollbar mt-10">
        <Link
          to={"/ai/chat"}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-neutral-91 rounded-full text-white font-medium mb-6"
        >
          <img src={ICONS.plusWhite} alt="" className="w-5" />
          New Chat
        </Link>

        {/* Recent History Section with Date Grouping */}
        <div className="mt-10 space-y-6 w-full">
          {groupedChats.length > 0 ? (
            groupedChats.map((group) => (
              <div key={group.date} className="space-y-2">
                {/* Date Header */}
                <p className="text-neutral-60 text-xs font-bold px-3">
                  {formatDateHeader(group.date)}
                </p>
                
                {/* Chats under this date */}
                <div className="flex flex-col">
                  {group.chats.map((chat: any) => (
                    <Link
                      key={chat?._id}
                      to={`/ai/chat/${chat?._id}`}
                      className={`w-full text-left px-3 py-2 rounded-2xl transition-all text-sm border ${
                        pathname === `/ai/chat/${chat?._id}` 
                          ? "bg-[#ffffff10] text-primary-20 border-neutral-50/50" 
                          : "text-neutral-60 border-transparent hover:bg-neutral-91"
                      }`}
                    >
                      {chat?.title?.length > 35 
                        ? `${chat?.title?.slice(0, 35)}...` 
                        : chat?.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-neutral-60 text-sm px-3 text-center py-8">
              No chats yet. Start a new conversation!
            </p>
          )}
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

        <button className="flex items-center gap-3 px-4 py-3 text-[#8F8F8F] hover:text-white transition-colors w-full rounded-xl hover:bg-[#ffffff08] mt-5">
          <FiLogOut size={18} />
          <span className="font-medium text-sm">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default AiChatbotSidebar;