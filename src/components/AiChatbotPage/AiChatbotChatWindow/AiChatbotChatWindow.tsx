/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiSparkles } from "react-icons/gi";
import { BiSend } from "react-icons/bi";
import toast from "react-hot-toast";
import AiChatbotHeader from "../AiChatbotHeader/AiChatbotHeader";
import {
  useGetChatByIdQuery,
  useSendMessageMutation,
} from "../../../redux/Features/Rag/aiChatApi";
import WelcomeState from "./WelcomeState/WelcomeState";
import TypingLoader from "./TypingLoader/TypingLoader";
import ChatActions from "./ChatActions/ChatActions";
import Sources from "./Sources/Sources";
import { useNavigate } from "react-router-dom";
import ChatMessagesSkeleton from "./ChatMessagesSkeleton/ChatMessagesSkeleton";

export type TMessage = {
  id: string;
  text: string;
  sender: "user" | "bot";
  sources?: any[];
  liked?: boolean;
  disliked?: boolean;
  isSourceVerified?: boolean;
};

const formatMarkdown = (text: string): string => {
  if (!text) return text;

  let formatted = text;

  // Headers
  formatted = formatted.replace(
    /^#### (.*$)/gim,
    '<h4 class="text-base font-semibold mt-3 mb-1.5">$1</h4>',
  );
  formatted = formatted.replace(
    /^### (.*$)/gim,
    '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>',
  );
  formatted = formatted.replace(
    /^## (.*$)/gim,
    '<h2 class="text-xl font-semibold mt-5 mb-3">$1</h2>',
  );
  formatted = formatted.replace(
    /^# (.*$)/gim,
    '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>',
  );

  // Bold
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Blockquotes
  formatted = formatted.replace(
    /^> (.*$)/gim,
    '<blockquote class="border-l-4 border-primary-10 pl-4 my-2 italic">$1</blockquote>',
  );

  // Inline code
  formatted = formatted.replace(
    /`(.*?)`/g,
    '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>',
  );

  // Bullet lists
  formatted = formatted.replace(/^- (.*$)/gim, "<li>$1</li>");
  formatted = formatted.replace(/^• (.*$)/gim, "<li>$1</li>");

  // Numbered lists
  formatted = formatted.replace(/^\d+\. (.*$)/gim, "<li>$1</li>");

  // Convert newlines to <br> for paragraphs (but not inside lists)
  const parts = formatted.split("\n\n");
  formatted = parts
    .map((p) => {
      if (p.includes("<li>")) {
        return `<ul class="list-disc pl-5 my-2 space-y-1">${p}</ul>`;
      }
      if (
        p.includes("<h1") ||
        p.includes("<h2") ||
        p.includes("<h3") ||
        p.includes("<blockquote")
      ) {
        return p;
      }
      return `<p class="leading-relaxed my-2">${p.replace(/\n/g, "<br />")}</p>`;
    })
    .join("");

  return formatted;
};

interface AiChatbotChatWindowProps {
  chatId?: string; // Get chatId from URL params
}

const AiChatbotChatWindow = ({ chatId }: AiChatbotChatWindowProps) => {
  const navigate = useNavigate();
  // ========== RTK QUERY HOOKS ==========
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // Fetch chat data if chatId exists
  const {
    data: chatData,
    isLoading: isChatLoading,
    refetch,
    isError,
  } = useGetChatByIdQuery(chatId || "", { skip: !chatId });
  if (isError) navigate("/ai/chat");

  // ========== LOCAL STATE ==========
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [currentChatId, setCurrentChatId] = useState<string | null>(
    chatId || null,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // ========== LOAD CHAT DATA WHEN chatId CHANGES ==========

  useEffect(() => {
    if (!chatId) {
      // Clear messages when no chat is selected (New Chat)
      setMessages([]);
      setCurrentChatId(null);
    } else {
      setCurrentChatId(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    if (chatId) {
      setCurrentChatId(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    if (chatId && chatData?.data) {
      // Transform backend messages to frontend format
      const formattedMessages: TMessage[] = chatData.data.messages.map(
        (msg: any, index: number) => ({
          id: msg._id || Date.now().toString() + index,
          text: msg.content,
          sender: msg.role === "user" ? "user" : "bot",
          sources: msg.sources || [],
          liked: false,
          disliked: false,
          isSourceVerified: msg.isSourceVerified,
        }),
      );
      setMessages(formattedMessages);
    }
  }, [chatData, chatId]);

  // ========== AUTO-SCROLL ==========
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // ========== SEND MESSAGE ==========
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const question = input.trim();

    // Send message to existing chat
    const userMessage: TMessage = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await sendMessage({
        chatId: currentChatId,
        question,
      }).unwrap();
      console.log(response);

      if (response?.success) {
        navigate(`/ai/chat/${response?.data?.chatId}`, { replace: true });
      }

      const botMessage: TMessage = {
        id: Date.now().toString() + "-bot",
        text:
          response.data?.message?.content ||
          response.message?.content ||
          "Response received",
        sender: "bot",
        sources:
          response.data?.message?.sources || response.message?.sources || [],
        liked: false,
        disliked: false,
      };
      setMessages((prev) => [...prev, botMessage]);

      // Refetch chat data to update cache
      if (currentChatId) {
        refetch();
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error?.data?.message || "Failed to send message");

      // Remove the user message if failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsTyping(false);
    }
  };

  // ========== RENDER ==========
  const isLoading = isSending || isChatLoading;

  return (
    <main className="flex-1 flex flex-col relative rounded-3xl bg-neutral-30 overflow-hidden text-neutral-90 font-Manrope">
      {/* Header */}
      <AiChatbotHeader />

      {/* Scrollable Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-10 py-8 no-scrollbar space-y-6 scroll-smooth bg-neutral-30"
      >
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            /* LOADING SKELETON - Check first */
            <ChatMessagesSkeleton />
          ) : messages.length === 0 ? (
            /* WELCOME STATE - Only when not loading and no messages */
            <WelcomeState />
          ) : (
            /* CHAT MESSAGES */
            <div className="max-w-[60%] mx-auto space-y-6">
              {messages?.map((msg) => {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    layout
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] ${msg.sender === "user" ? "ml-auto" : "mr-auto"}`}
                    >
                      {/* ========== MESSAGE BUBBLE ========== */}
                      <div
                        className={`px-5 py-3.5 rounded-3xl shadow-sm transition-all text-sm md:text-base ${
                          msg.sender === "user"
                            ? "bg-[#F3E8D2] text-slate-800 rounded-tr-none border border-[#E8D5B5]"
                            : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                        }`}
                      >
                        <div
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: formatMarkdown(msg.text),
                          }}
                        />

                        {/* ========== VERIFIED BADGE ========== */}
                        {msg.sender === "bot" && msg.isSourceVerified && (
                          <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center gap-1.5">
                            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-2.5 h-2.5"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span className="text-xs font-medium text-emerald-600">
                              Verified Source
                            </span>
                          </div>
                        )}
                      </div>

                      {/* ========== BOT MESSAGE META INFO ========== */}
                      {msg.sender === "bot" && (
                        <div className="mt-2 space-y-2">
                          {msg.sources && msg.sources.length > 0 && (
                            <Sources msg={msg} />
                          )}
                          <ChatActions msg={msg} setMessages={setMessages} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && <TypingLoader />}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area - Always at bottom */}
      <div className="p-4 md:p-6 bg-linear-to-t from-white via-white to-transparent pt-10 border-t border-neutral-20">
        <form
          onSubmit={handleSend}
          className="relative max-w-4xl mx-auto bg-white rounded-[2.5rem] p-1.5 shadow-md border border-neutral-100 flex items-center gap-2 group transition-all focus-within:ring-4 focus-within:ring-[#D9A241]/10"
        >
          <div className="pl-5 text-[#D9A241]">
            <GiSparkles size={22} className="animate-pulse" />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoading ? "Thinking..." : "Ask me anything..."}
            className="flex-1 py-3 md:py-4 bg-transparent outline-none text-base md:text-lg text-slate-700 placeholder:text-slate-400 disabled:opacity-60"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-3 md:p-4 rounded-full transition-all shadow-lg flex items-center justify-center ${
              input.trim() && !isLoading
                ? "bg-[#D9A241] text-white hover:scale-105 active:scale-95 shadow-orange-200"
                : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-10 border-t-transparent rounded-full animate-spin" />
            ) : (
              <BiSend size={24} />
            )}
          </button>
        </form>
        <p className="text-center text-[10px] tracking-[0.2em] text-neutral-50 mt-5 font-bold opacity-60">
          Powered by Vedic Wisdom AI &bull; Smart Assistant
        </p>
      </div>

      {/* CSS Utilities */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .animate-bounce {
          animation: bounce 0.6s infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
};

export default AiChatbotChatWindow;
