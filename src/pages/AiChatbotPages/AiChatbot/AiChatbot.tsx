import AiChatbotSidebar from "../../../components/AiChatbotPage/AiChatbotSidebar/AiChatbotSidebar";
import AiChatbotChatWindow from "../../../components/AiChatbotPage/AiChatbotChatWindow/AiChatbotChatWindow";

const AiChatbot = () => {
  return (
    <div className="flex w-full font-Manrope ">
      {/* --- LEFT SIDEBAR --- */}
      <AiChatbotSidebar />

      {/* --- RIGHT CHAT WINDOW --- */}
      <AiChatbotChatWindow />
    </div>
  );
};

export default AiChatbot;
