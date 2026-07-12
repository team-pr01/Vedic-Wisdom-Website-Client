/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiSparkles } from "react-icons/gi";
import { BiSend } from "react-icons/bi";
import { ICONS } from "../../../assets";

const AiChatbot = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: "Typically, you'll want about 2 cups of flour for every egg. It's a good ratio to start with! Would you like to know about the mixing process as well?",
        sender: "bot",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="font-Manrope text-slate-800 relative flex flex-col h-[calc(100vh-100px)] lg:h-[calc(100vh-120px)] w-full max-w-5xl mx-auto rounded-3xl overflow-hidden">
      {/* 1. SCROLLABLE CHAT AREA */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-10 py-8 no-scrollbar space-y-6 scroll-smooth"
      >
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            /* WELCOME STATE */
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
                For deeper understanding, consult experts or authentic sources.
              </p>
            </motion.div>
          ) : (
            /* CHAT MESSAGES */
            <>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  layout
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[70%] px-5 py-3.5 rounded-3xl shadow-sm transition-all text-sm md:text-base ${
                      msg.sender === "user"
                        ? "bg-[#F3E8D2] text-slate-800 rounded-tr-none border border-[#E8D5B5]"
                        : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

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
            </>
          )}
        </AnimatePresence>
      </div>

      {/* 2. STICKY INPUT AREA */}
      <div className="p-4 md:p-6 bg-linear-to-t from-white via-white to-transparent pt-10">
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
            placeholder="Ask me anything..."
            className="flex-1 py-3 md:py-4 bg-transparent outline-none text-base md:text-lg text-slate-700 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className={`p-3 md:p-4 rounded-full transition-all shadow-lg ${
              input.trim()
                ? "bg-[#D9A241] text-white hover:scale-105 active:scale-95 shadow-orange-200"
                : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
            }`}
          >
            <BiSend size={24} />
          </button>
        </form>
        <p className="text-center text-[10px] uppercase tracking-[0.2em] text-neutral-50 mt-5 font-bold opacity-60">
          Powered by Spiritual AI &bull; Smart Assistant
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
      `}</style>
    </div>
  );
};

export default AiChatbot;
