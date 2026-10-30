/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { ICONS } from "../../../../../assets";
import Button from "../../../../Reusable/Button/Button";
import Textarea from "../../../../Reusable/TextArea/TextArea";
import { useGenerateMuhurtaMutation } from "../../../../../redux/Features/Vastu/vastuApi";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiSparkles } from "react-icons/gi";
import { BiSend } from "react-icons/bi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type TFormData = {
  query: string;
};

type TMessage = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

const MuhurtaGuidance = () => {
  const [generateMuhurta, { isLoading }] = useGenerateMuhurtaMutation();
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TFormData>();

  // Check if AI has already responded
  const hasAiResponse = messages.some((msg) => msg.sender === "ai");
  // Disable input if loading or if AI has responded
  const isInputDisabled = isLoading || hasAiResponse;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleAnalyseMuhurta = async (data: TFormData) => {
    if (isInputDisabled) return; // Prevent submission if disabled

    try {
      // Add user message
      const userMessage: TMessage = {
        id: Date.now().toString(),
        sender: "user",
        text: data.query,
      };
      setMessages((prev) => [...prev, userMessage]);
      reset(); // Clear the textarea
      setIsTyping(true);

      // API Call
      const response = await generateMuhurta({ query: data.query }).unwrap();

      // Add AI response
      const aiMessage: TMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: response?.data || "Sorry, I couldn't find the Muhurta guidance.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error(error);
      const errorMessage: TMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // If there are no messages, show the initial form view
  if (messages.length === 0) {
    return (
      <form
        onSubmit={handleSubmit(handleAnalyseMuhurta)}
        className="space-y-4 w-full text-left"
      >
        <Textarea
          label="Your Question / Event"
          placeholder="Find a Muhurta for marriage in 2026. Best time for a new business. Auspicious date for housewarming."
          error={errors.query}
          {...register("query", {
            required: "This field is required",
          })}
        />
        <Button
          type="submit"
          label={isLoading ? "Finding..." : "Submit"}
          rightIcon={ICONS.arrowRight}
          className="w-full"
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </form>
    );
  }

  // If there are messages, show the Chat UI
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-100">
        <h3 className="text-lg font-bold text-neutral-90 flex items-center gap-2">
          <GiSparkles className="text-[#D9A241]" /> Muhurta Insights
        </h3>
        <button
          onClick={() => setMessages([])}
          className="text-sm text-neutral-50 hover:text-[#D9A241] flex items-center gap-1 transition-colors"
        >
          New Query
        </button>
      </div>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar space-y-4 scroll-smooth max-h-[60vh] min-h-[40vh] mb-4 pr-2"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
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
                className={`max-w-[90%] px-5 py-3.5 rounded-3xl shadow-sm transition-all text-sm md:text-base text-left ${
                  msg.sender === "user"
                    ? "bg-[#F3E8D2] text-slate-800 rounded-tr-none border border-[#E8D5B5]"
                    : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                }`}
              >
                {msg.sender === "user" ? (
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-xl font-bold text-slate-900 mt-4 mb-2" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-lg font-semibold text-slate-800 mt-3 mb-2" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-base font-semibold text-slate-800 mt-3 mb-1" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-sm leading-relaxed mb-2 text-slate-700" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-bold text-slate-900" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-5 my-2 space-y-1 text-left" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-5 my-2 space-y-1 text-left" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-sm text-slate-700" {...props} />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                )}
              </div>
            </motion.div>
          ))}

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
        </AnimatePresence>
      </div>

      {/* Input Area for follow-up questions */}
      <form
        onSubmit={handleSubmit(handleAnalyseMuhurta)}
        className={`relative w-full bg-[#FAFAF8] rounded-2xl p-1.5 shadow-sm border border-neutral-100 flex items-center gap-2 group transition-all focus-within:ring-4 focus-within:ring-[#D9A241]/10 ${
          isInputDisabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <div className="pl-3 text-[#D9A241]">
          <GiSparkles size={18} className="animate-pulse" />
        </div>
        <input
          type="text"
          {...register("query", { required: true })}
          disabled={isInputDisabled}
          placeholder={hasAiResponse ? "AI has answered your query." : "Ask a follow-up question..."}
          className="flex-1 py-2.5 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isInputDisabled}
          className={`p-2.5 rounded-xl transition-all shadow-sm ${
            !isInputDisabled
              ? "bg-[#D9A241] text-white hover:scale-105 active:scale-95 shadow-orange-200"
              : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
          }`}
        >
          <BiSend size={18} />
        </button>
      </form>

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

export default MuhurtaGuidance;