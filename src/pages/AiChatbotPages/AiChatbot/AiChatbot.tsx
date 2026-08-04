import AiChatbotSidebar from "../../../components/AiChatbotPage/AiChatbotSidebar/AiChatbotSidebar";
import AiChatbotChatWindow from "../../../components/AiChatbotPage/AiChatbotChatWindow/AiChatbotChatWindow";
import { useNavigate, useParams } from "react-router-dom";

const AiChatbot = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();

  const handleChatCreated = (newChatId: string) => {
    // Update URL when new chat is created
    navigate(`/ai/chat/${newChatId}`, { replace: true });
  };
  return (
    <div className="flex w-full font-Manrope ">
      {/* --- LEFT SIDEBAR --- */}
      <AiChatbotSidebar />

      {/* --- RIGHT CHAT WINDOW --- */}
      <AiChatbotChatWindow chatId={chatId} onChatCreated={handleChatCreated} />
    </div>
  );
};

export default AiChatbot;
