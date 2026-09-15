import AiChatbotSidebar from "../../../components/AiChatbotPage/AiChatbotSidebar/AiChatbotSidebar";
import AiChatbotChatWindow from "../../../components/AiChatbotPage/AiChatbotChatWindow/AiChatbotChatWindow";
import { useParams } from "react-router-dom";

const AiChatbot = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  return (
    <div className="flex w-full font-Manrope ">
      {/* --- LEFT SIDEBAR --- */}
      <AiChatbotSidebar />

      {/* --- RIGHT CHAT WINDOW --- */}
      <AiChatbotChatWindow chatId={chatId} />
    </div>
  );
};

export default AiChatbot;
