/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ICONS } from "../../../../assets";
import toast from "react-hot-toast";
import type { TMessage } from "../AiChatbotChatWindow";

const ChatActions = ({
  msg,
  setMessages,
}: {
  msg: TMessage;
  setMessages: any;
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // ========== LIKE / DISLIKE ==========
  const handleLike = (messageId: string) => {
    setMessages((prev: any) =>
      prev.map((msg: TMessage) =>
        msg.id === messageId
          ? { ...msg, liked: !msg.liked, disliked: false }
          : msg,
      ),
    );
  };

  const handleDislike = (messageId: string) => {
    setMessages((prev: any) =>
      prev.map((msg: TMessage) =>
        msg.id === messageId
          ? { ...msg, disliked: !msg.disliked, liked: false }
          : msg,
      ),
    );
  };

  // ========== COPY ==========
  const handleCopy = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error: any) {
      console.error("Error copying:", error);
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="flex items-center gap-4 text-xs text-neutral-40 px-1 flex-wrap">
      <button
        onClick={() => handleCopy(msg.text, msg.id)}
        className="flex items-center gap-1 hover:text-primary-10 transition-colors"
        title="Copy response"
      >
        <img src={ICONS.copy} alt="" className="w-4" />
        <span className="hidden sm:inline">
          {copiedId === msg.id ? "Copied" : "Copy"}
        </span>
      </button>

      {/* Regenerate Button */}
      {/* {isLastBotMessage && (
                  <button
                    onClick={() => handleRegenerate(msg.id)}
                    disabled={isLoading}
                    className={`flex items-center gap-1 hover:text-primary-10 transition-colors ${
                      isRegenerating ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    title="Regenerate response"
                  >
                    <img src={ICONS.resetGray} alt="" className="w-4" />
                    <span className="hidden sm:inline">
                      {isRegenerating ? "Regenerating..." : "Regenerate"}
                    </span>
                  </button>
                )} */}

      {/* Like / Dislike */}
      <div className="flex items-center">
        <button
          onClick={() => handleLike(msg.id)}
          className={`p-1.5 rounded-lg transition-all duration-200 ${
            msg.liked
              ? "bg-primary-10 text-white"
              : "text-neutral-40 hover:bg-neutral-10/10"
          }`}
          title="Like"
        >
          <img src={ICONS.like} alt="" className="w-4" />
        </button>
        <button
          onClick={() => handleDislike(msg.id)}
          className={`p-1.5 rounded-lg transition-all duration-200 ${
            msg.disliked
              ? "bg-red-500 text-white"
              : "text-neutral-40 hover:bg-neutral-10/10"
          }`}
          title="Dislike"
        >
          <img src={ICONS.dislike} alt="" className="w-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatActions;
