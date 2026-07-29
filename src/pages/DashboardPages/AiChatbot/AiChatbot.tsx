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
import { useAskQuestionMutation } from "../../../redux/Features/Rag/ragApi";
import toast from "react-hot-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  sources?: any[];
  processingTime?: number;
  confidence?: number;
  liked?: boolean;
  disliked?: boolean;
  originalQuestion?: string; // ✅ Store original question for regeneration
  isRegenerated?: boolean; // ✅ Track if this is a regenerated response
}

const AiChatbot = () => {
  const [askQuestion, { isLoading }] = useAskQuestionMutation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [expandedSources, setExpandedSources] = useState<number | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // Send message function
  const sendMessage = async (question: string) => {
    try {
      const response = await askQuestion({ question }).unwrap();

      if (response?.success) {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: response.data.answer,
          sender: "bot",
          sources: response.data.sources || [],
          processingTime: response.data.processingTime || 0,
          confidence: response.data.confidence || 0,
          liked: false,
          disliked: false,
          originalQuestion: question, // ✅ Store original question
        };
        setMessages((prev) => [...prev, botMessage]);
        return response;
      } else {
        toast.error(response?.message || "Failed to get response");
        return null;
      }
    } catch (error: any) {
      console.error("Error asking question:", error);
      toast.error(error?.data?.message || "Something went wrong");

      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: "bot",
        originalQuestion: question,
      };
      setMessages((prev) => [...prev, errorMessage]);
      return null;
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isRegenerating) return;

    const question = input.trim();
    
    // ✅ Check if user is trying to regenerate via text
    const isRegenerateCommand = question.toLowerCase().includes("regenerate") || 
                                question.toLowerCase().includes("again") ||
                                question.toLowerCase().includes("not correct");

    // If it's a regenerate command, find the last bot message and regenerate it
    if (isRegenerateCommand) {
      const lastBotMessage = [...messages].reverse().find(msg => msg.sender === "bot");
      if (lastBotMessage && lastBotMessage.originalQuestion) {
        await handleRegenerate(lastBotMessage.id);
        setInput("");
        return;
      }
    }

    // Normal flow - send as new question
    const userMessage: Message = {
      id: Date.now(),
      text: question,
      sender: "user",
      originalQuestion: question,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await sendMessage(question);

    setIsTyping(false);
  };

  // ✅ FIXED: REGENERATE FUNCTION - uses original question
  const handleRegenerate = async (messageId: number) => {
    // Find the bot message
    const botMessage = messages.find((msg) => msg.id === messageId);
    if (!botMessage) {
      toast.error("Message not found");
      return;
    }

    // ✅ Get the original question from the bot message
    const originalQuestion = botMessage.originalQuestion;
    if (!originalQuestion) {
      toast.error("No original question found to regenerate");
      return;
    }

    if (isRegenerating || isLoading) return;

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

      // ✅ Send the ORIGINAL question, not "regenerate"
      const response = await askQuestion({ question: originalQuestion }).unwrap();

      if (response?.success) {
        const newBotMessage: Message = {
          id: Date.now() + 1,
          text: response.data.answer,
          sender: "bot",
          sources: response.data.sources || [],
          processingTime: response.data.processingTime || 0,
          confidence: response.data.confidence || 0,
          liked: false,
          disliked: false,
          originalQuestion: originalQuestion,
          isRegenerated: true,
        };
        setMessages((prev) => [...prev, newBotMessage]);
        toast.success("Response regenerated");
      } else {
        toast.error(response?.message || "Failed to regenerate");
        // Restore fallback message
        const fallbackMessage: Message = {
          id: Date.now() + 1,
          text: "Sorry, I couldn't regenerate the response. Please try again.",
          sender: "bot",
          originalQuestion: originalQuestion,
        };
        setMessages((prev) => [...prev, fallbackMessage]);
      }
    } catch (error: any) {
      console.error("Error regenerating:", error);
      toast.error(error?.data?.message || "Failed to regenerate");
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I couldn't regenerate the response. Please try again.",
        sender: "bot",
        originalQuestion: originalQuestion,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsRegenerating(false);
      setIsTyping(false);
    }
  };

  const handleLike = (messageId: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, liked: !msg.liked, disliked: false }
          : msg,
      ),
    );
  };

  const handleDislike = (messageId: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, disliked: !msg.disliked, liked: false }
          : msg,
      ),
    );
  };

  const toggleSources = (messageId: number) => {
    setExpandedSources(expandedSources === messageId ? null : messageId);
  };

  const handleCopy = async (text: string, messageId: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(messageId);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error:any) {
      console.error("Copy failed:", error);
      toast.error("Failed to copy");
    }
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="bg-[#FAFAF8] font-Manrope">
      <div className="font-Manrope text-slate-800 relative flex flex-col h-[calc(100vh-100px)] lg:h-[calc(100vh-120px)] w-full max-w-5xl mx-auto rounded-3xl overflow-hidden ">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 md:px-10 py-8 no-scrollbar space-y-6 scroll-smooth"
        >
          <AnimatePresence mode="popLayout">
            {messages.length === 0 ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center min-h-full text-center"
              >
                <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-orange-100 flex items-center justify-center mb-6 border border-orange-50">
                  <img src={ICONS.aiChatbot} alt="AI" className="w-12 h-12" />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                  AI Page Should Feel <br />{" "}
                  <span className="text-[#D9A241]">Like A Friend.</span>
                </h1>
                <p className="text-slate-500 max-w-md mx-auto leading-relaxed text-sm md:text-base">
                  For deeper understanding, consult experts or authentic
                  sources.
                </p>
              </motion.div>
            ) : (
              <>
                {messages.map((msg, index) => {
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
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="max-w-[85%] md:max-w-[80%]">
                        <div
                          className={`px-5 py-3.5 rounded-3xl shadow-sm transition-all text-sm md:text-base ${
                            msg.sender === "user"
                              ? "bg-[#F3E8D2] text-slate-800 rounded-tr-none border border-[#E8D5B5]"
                              : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-wrap">
                            {msg.text}
                          </p>
                          {msg.isRegenerated && msg.sender === "bot" && (
                            <span className="text-xs text-primary-10 mt-1 block">
                              ✨ Regenerated
                            </span>
                          )}
                        </div>

                        {msg.sender === "bot" && (
                          <div className="mt-2 space-y-2">
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
                                              {source.category || "General"} •
                                              <span className="ml-1">
                                                {source.source || "Unknown"}
                                              </span>
                                            </p>
                                          </div>
                                          {source.relevanceScore && (
                                            <span className="text-xs bg-primary-10/10 text-primary-10 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
                                              {(
                                                source.relevanceScore * 100
                                              ).toFixed(0)}
                                              %
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-xs text-neutral-50 mt-1.5 line-clamp-2">
                                          {source.content?.slice(0, 150)}...
                                        </p>
                                        <button className="text-xs text-primary-10 hover:underline mt-1.5 flex items-center gap-1">
                                          View Source
                                          <FaExternalLinkAlt className="text-[10px]" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="flex items-center gap-4 text-xs text-neutral-40 px-1 flex-wrap">
                              {msg.processingTime && (
                                <span className="flex items-center gap-1">
                                  <img src={ICONS.time} alt="" />
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

                              {/* ✅ REGENERATE BUTTON - passes the message ID */}
                              {isLastBotMessage && (
                                <button
                                  onClick={() => handleRegenerate(msg.id)}
                                  disabled={isRegenerating || isLoading}
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
                            </div>

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
                        )}
                      </div>
                    </motion.div>
                  );
                })}

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
              </>
            )}
          </AnimatePresence>
        </div>

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
              disabled={isLoading || isRegenerating}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading || isRegenerating}
              className={`p-3 md:p-4 rounded-full transition-all shadow-lg ${
                input.trim() && !isLoading && !isRegenerating
                  ? "bg-[#D9A241] text-white hover:scale-105 active:scale-95 shadow-orange-200"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
              }`}
            >
              <BiSend size={24} />
            </button>
          </form>
          <p className="text-center text-[10px] tracking-[0.2em] text-neutral-50 mt-5 font-bold opacity-60">
            Powered by Vedic Wisdom AI &bull; Smart Assistant
          </p>
        </div>

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
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      </div>
    </div>
  );
};

export default AiChatbot;