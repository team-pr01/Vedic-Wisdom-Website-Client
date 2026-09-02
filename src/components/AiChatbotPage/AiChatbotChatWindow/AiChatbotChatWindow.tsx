/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiSparkles } from "react-icons/gi";
import { BiSend } from "react-icons/bi";
import {
  FaBookOpen,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { ICONS } from "../../../assets";
import toast from "react-hot-toast";
import AiChatbotHeader from "../AiChatbotHeader/AiChatbotHeader";
import {
  useCreateChatMutation,
  useGetChatByIdQuery,
  useRegenerateMessageMutation,
  useSendMessageMutation,
} from "../../../redux/Features/Rag/aiChatApi";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  sources?: any[];
  processingTime?: number;
  confidence?: number;
  liked?: boolean;
  disliked?: boolean;
  originalQuestion?: string;
  isRegenerated?: boolean;
}

const formatMarkdown = (text: string): string => {
  if (!text) return text;

  let formatted = text;

  // Headers
   formatted = formatted.replace(/^#### (.*$)/gim, '<h4 class="text-base font-semibold mt-3 mb-1.5">$1</h4>');
  formatted = formatted.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>');
  formatted = formatted.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-5 mb-3">$1</h2>');
  formatted = formatted.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>');

  // Bold
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Blockquotes
  formatted = formatted.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary-10 pl-4 my-2 italic">$1</blockquote>');

  // Inline code
  formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');

  // Bullet lists
  formatted = formatted.replace(/^- (.*$)/gim, '<li>$1</li>');
  formatted = formatted.replace(/^• (.*$)/gim, '<li>$1</li>');
  
  // Numbered lists
  formatted = formatted.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

  // Convert newlines to <br> for paragraphs (but not inside lists)
  const parts = formatted.split('\n\n');
  formatted = parts.map(p => {
    if (p.includes('<li>')) {
      return `<ul class="list-disc pl-5 my-2 space-y-1">${p}</ul>`;
    }
    if (p.includes('<h1') || p.includes('<h2') || p.includes('<h3') || p.includes('<blockquote')) {
      return p;
    }
    return `<p class="leading-relaxed my-2">${p.replace(/\n/g, '<br />')}</p>`;
  }).join('');

  return formatted;
};

interface AiChatbotChatWindowProps {
  chatId?: string; // ✅ Get chatId from URL params
  onChatCreated?: (chatId: string) => void; // ✅ Callback when new chat is created
}

const AiChatbotChatWindow = ({
  chatId,
  onChatCreated,
}: AiChatbotChatWindowProps) => {
  // ========== RTK QUERY HOOKS ==========
  const [createChat, { isLoading: isCreating }] = useCreateChatMutation();
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const [regenerateMessage] = useRegenerateMessageMutation();

  // Fetch chat data if chatId exists
  const {
    data: chatData,
    isLoading: isChatLoading,
    refetch,
  } = useGetChatByIdQuery(chatId || "", { skip: !chatId });

  // ========== LOCAL STATE ==========
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [expandedSources, setExpandedSources] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(
    chatId || null,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // ========== LOAD CHAT DATA WHEN chatId CHANGES ==========

  useEffect(() => {
    if (!chatId) {
      // ✅ Clear messages when no chat is selected (New Chat)
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
    if (chatData?.data) {
      // Transform backend messages to frontend format
      const formattedMessages: Message[] = chatData.data.messages.map(
        (msg: any, index: number) => ({
          id: msg._id || Date.now().toString() + index,
          text: msg.content,
          sender: msg.role === "user" ? "user" : "bot",
          sources: msg.sources || [],
          processingTime: msg.metadata?.processingTime || 0,
          confidence: msg.metadata?.confidence || 0,
          liked: false,
          disliked: false,
          originalQuestion:
            msg.role === "bot"
              ? chatData.data.messages[index - 1]?.content
              : undefined,
          isRegenerated: msg.metadata?.isRegenerated || false,
        }),
      );
      setMessages(formattedMessages);
    }
  }, [chatData]);

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
    if (!input.trim() || isSending || isRegenerating || isCreating) return;

    const question = input.trim();

    // Check if user is trying to regenerate via text
    const isRegenerateCommand =
      question.toLowerCase().includes("regenerate") ||
      question.toLowerCase().includes("again") ||
      question.toLowerCase().includes("not correct");

    if (isRegenerateCommand) {
      const lastBotMessage = [...messages]
        .reverse()
        .find((msg) => msg.sender === "bot");
      if (lastBotMessage && lastBotMessage.originalQuestion) {
        await handleRegenerate(lastBotMessage.id);
        setInput("");
        return;
      }
    }

    // If no chat exists, create one
    if (!currentChatId) {
      try {
        setIsTyping(true);
        const result = await createChat({
          title: question.slice(0, 50) + (question.length > 50 ? "..." : ""),
          initialMessage: question,
        }).unwrap();

        const newChatId = result.data?._id || result.chatId;
        setCurrentChatId(newChatId);

        // Notify parent to update URL
        if (onChatCreated) {
          onChatCreated(newChatId);
        }

        // Add messages
        const userMessage: Message = {
          id: Date.now().toString(),
          text: question,
          sender: "user",
          originalQuestion: question,
        };
        setMessages((prev) => [...prev, userMessage]);

        const botMessage: Message = {
          id: Date.now().toString() + "-bot",
          text:
            result.data?.messages?.[result.data.messages.length - 1]?.content ||
            result.answer ||
            "Response received",
          sender: "bot",
          sources: result.data?.sources || [],
          processingTime: 0,
          confidence: 0,
          liked: false,
          disliked: false,
          originalQuestion: question,
        };
        setMessages((prev) => [...prev, botMessage]);
        setInput("");
        setIsTyping(false);
        return;
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create chat");
        return;
      } finally {
        setIsTyping(false);
      }
    }

    // Send message to existing chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
      originalQuestion: question,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await sendMessage({
        chatId: currentChatId,
        message: question,
      }).unwrap();

      const botMessage: Message = {
        id: Date.now().toString() + "-bot",
        text:
          response.data?.message?.content ||
          response.message?.content ||
          "Response received",
        sender: "bot",
        sources:
          response.data?.message?.sources || response.message?.sources || [],
        processingTime: response.data?.message?.metadata?.processingTime || 0,
        confidence: response.data?.message?.metadata?.confidence || 0,
        liked: false,
        disliked: false,
        originalQuestion: question,
      };
      setMessages((prev) => [...prev, botMessage]);

      // Refetch chat data to update cache
      refetch();
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error?.data?.message || "Failed to send message");

      // Remove the user message if failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsTyping(false);
    }
  };

  // ========== REGENERATE ==========
  const handleRegenerate = async (messageId: string) => {
    const botMessage = messages.find((msg) => msg.id === messageId);
    if (!botMessage) {
      toast.error("Message not found");
      return;
    }

    const originalQuestion = botMessage.originalQuestion;
    if (!originalQuestion) {
      toast.error("No original question found to regenerate");
      return;
    }

    if (isRegenerating || isSending || !currentChatId) return;

    setIsRegenerating(true);
    setIsTyping(true);

    try {
      // Remove the last bot message
      setMessages((prev) => {
        const index = prev.findIndex((msg) => msg.id === messageId);
        if (index !== -1) {
          const newMessages = [...prev];
          newMessages.splice(index, 1);
          return newMessages;
        }
        return prev;
      });

      const response = await regenerateMessage({
        chatId: currentChatId,
      }).unwrap();

      const newBotMessage: Message = {
        id: Date.now().toString() + "-regen",
        text:
          response.data?.message?.content ||
          response.message?.content ||
          "Regenerated response",
        sender: "bot",
        sources:
          response.data?.message?.sources || response.message?.sources || [],
        processingTime: response.data?.message?.metadata?.processingTime || 0,
        confidence: response.data?.message?.metadata?.confidence || 0,
        liked: false,
        disliked: false,
        originalQuestion: originalQuestion,
        isRegenerated: true,
      };
      setMessages((prev) => [...prev, newBotMessage]);
      toast.success("Response regenerated");

      // Refetch chat data
      refetch();
    } catch (error: any) {
      console.error("Error regenerating:", error);
      toast.error(error?.data?.message || "Failed to regenerate");

      // Restore the removed message
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsRegenerating(false);
      setIsTyping(false);
    }
  };

  // ========== LIKE / DISLIKE ==========
  const handleLike = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, liked: !msg.liked, disliked: false }
          : msg,
      ),
    );
  };

  const handleDislike = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, disliked: !msg.disliked, liked: false }
          : msg,
      ),
    );
  };

  // ========== SOURCE TOGGLE ==========
  const toggleSources = (messageId: string) => {
    setExpandedSources(expandedSources === messageId ? null : messageId);
  };

  // ========== COPY ==========
  const handleCopy = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(messageId);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error: any) {
      console.error("Copy failed:", error);
      toast.error("Failed to copy");
    }
  };

  // ========== FORMAT TIME ==========
  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  // ========== RENDER ==========
  const isLoading = isSending || isRegenerating || isCreating || isChatLoading;

  return (
    <main className="flex-1 flex flex-col relative rounded-3xl bg-[#fafafa] overflow-hidden text-[#1C2542] font-Manrope">
      {/* Header */}
      <AiChatbotHeader />

      {/* Scrollable Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-10 py-8 no-scrollbar space-y-6 scroll-smooth bg-[#fafafa]"
      >
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            /* WELCOME STATE - Centered */
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] text-center"
            >
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-orange-100 flex items-center justify-center mb-6 border border-orange-50">
                <img src={ICONS.aiChatbot} alt="AI" className="w-12 h-12" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                Your Guide to <br />{" "}
                <span className="text-[#D9A241]">Vedic Knowledge</span>
              </h1>
              <p className="text-slate-500 max-w-md mx-auto leading-relaxed text-sm md:text-base">
                Ask questions about scriptures, rituals, and spiritual wisdom.
              </p>
            </motion.div>
          ) : (
            /* CHAT MESSAGES */
            <div className="max-w-[60%] mx-auto space-y-6">
  {messages?.map((msg, index) => {
    const isLastBotMessage =
      msg.sender === "bot" &&
      index === messages.length - 1 &&
      messages[messages.length - 1]?.sender === "bot";

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
        <div className={`max-w-[85%] ${msg.sender === "user" ? "ml-auto" : "mr-auto"}`}>
          {/* ========== MESSAGE BUBBLE ========== */}
          <div
            className={`px-5 py-3.5 rounded-3xl shadow-sm transition-all text-sm md:text-base ${
              msg.sender === "user"
                ? "bg-[#F3E8D2] text-slate-800 rounded-tr-none border border-[#E8D5B5]"
                : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
            }`}
          >
            {/* ✅ Format message with proper markdown/HTML */}
            <div 
  className="leading-relaxed"
  dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.text) }}
/>
            
            {msg.isRegenerated && msg.sender === "bot" && (
              <span className="text-xs text-primary-10 mt-1 block">
                ✨ Regenerated
              </span>
            )}
          </div>

          {/* ========== BOT MESSAGE META INFO ========== */}
          {msg.sender === "bot" && (
            <div className="mt-2 space-y-2">
              {/* Sources */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="bg-neutral-10/5 rounded-xl border border-neutral-20 overflow-hidden">
                  <button
                    onClick={() => toggleSources(msg.id)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-10/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FaBookOpen className="text-primary-10 text-sm" />
                      <span className="text-sm font-medium text-neutral-90">
                        View Sources ({msg.sources.length})
                      </span>
                    </div>
                    {expandedSources === msg.id ? (
                      <FaChevronUp className="text-neutral-40" />
                    ) : (
                      <FaChevronDown className="text-neutral-40" />
                    )}
                  </button>

                  {expandedSources === msg.id && (
                    <div className="px-4 pb-3 space-y-2">
                      {msg.sources.map((source, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-lg p-3 border border-neutral-20 hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-neutral-90">
                                {source.title || "Source"}
                              </p>
                              <p className="text-xs text-neutral-60 mt-0.5">
                                {source.category || "General"}
                              </p>
                            </div>
                          </div>
                          {source.url && (
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary-10 hover:underline mt-1.5 flex items-center gap-1"
                            >
                              View Source
                              <FaExternalLinkAlt className="text-[10px]" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 text-xs text-neutral-40 px-1 flex-wrap">
                {msg.processingTime && (
                  <span className="flex items-center gap-1">
                    <img src={ICONS.time} alt="" className="w-4" />
                    {formatTime(msg.processingTime)}
                  </span>
                )}

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
                {isLastBotMessage && (
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
                )}

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
            </div>
          )}
        </div>
      </motion.div>
    );
  })}

  {/* Typing Indicator */}
  {isTyping && (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="bg-white px-5 py-3 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1">
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
      </div>
    </motion.div>
  )}
</div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area - Always at bottom */}
      <div className="p-4 md:p-6 bg-gradient-to-t from-white via-white to-transparent pt-10 border-t border-neutral-20">
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
