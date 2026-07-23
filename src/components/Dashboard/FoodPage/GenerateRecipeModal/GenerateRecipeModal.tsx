/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGenerateRecipeMutation } from "../../../../redux/Features/Food/foodApi";
import Modal from "../../../Reusable/Modal/Modal";
import { ICONS } from "../../../../assets";
import { GiSparkles } from "react-icons/gi";
import { BiSend } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type TMessage = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

const GenerateRecipeModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const [generateRecipe, { isLoading }] = useGenerateRecipeMutation();
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: TMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await generateRecipe({ query: input }).unwrap();
      const aiMessage: TMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: response?.data || "Sorry, I couldn't generate a recipe.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      const errorMessage: TMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Sorry, I couldn't generate a recipe. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      width="w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[45%]"
    >
      <div className="font-Manrope text-slate-800 relative flex flex-col h-[90vh] max-h-180 w-full max-w-4xl mx-auto rounded-3xl overflow-hidden">
        {/* Chat Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto no-scrollbar space-y-4 scroll-smooth p-4"
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
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight">
                  What would you like
                  <br />
                  <span className="text-[#D9A241]">to cook today?</span>
                </h1>
                <p className="text-slate-500 max-w-md mx-auto leading-relaxed text-sm">
                  Ask me for recipes, ingredients, or cooking tips!
                </p>
              </motion.div>
            ) : (
              <>
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
                      className={`max-w-[85%] px-5 py-3.5 rounded-3xl shadow-sm transition-all text-sm md:text-base ${
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
                              <h1
                                className="text-2xl font-bold text-slate-900 mt-4 mb-2"
                                {...props}
                              />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2
                                className="text-xl font-semibold text-slate-800 mt-3 mb-2"
                                {...props}
                              />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3
                                className="text-lg font-semibold text-slate-800 mt-3 mb-1"
                                {...props}
                              />
                            ),
                            h4: ({ node, ...props }) => (
                              <h4
                                className="text-base font-semibold text-slate-800 mt-2 mb-1"
                                {...props}
                              />
                            ),
                            p: ({ node, ...props }) => (
                              <p
                                className="text-sm leading-relaxed mb-2 text-slate-700"
                                {...props}
                              />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong
                                className="font-bold text-slate-900"
                                {...props}
                              />
                            ),
                            em: ({ node, ...props }) => (
                              <em
                                className="italic text-slate-700"
                                {...props}
                              />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul
                                className="list-disc pl-5 my-2 space-y-1"
                                {...props}
                              />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol
                                className="list-decimal pl-5 my-2 space-y-1"
                                {...props}
                              />
                            ),
                            li: ({ node, ...props }) => (
                              <li
                                className="text-sm text-slate-700"
                                {...props}
                              />
                            ),
                            a: ({ node, ...props }) => (
                              <a
                                className="text-[#D9A241] hover:underline"
                                {...props}
                              />
                            ),
                            blockquote: ({ node, ...props }) => (
                              <blockquote
                                className="border-l-4 border-[#D9A241] pl-4 my-2 text-slate-600 italic"
                                {...props}
                              />
                            ),
                            code: ({
                              node,
                              className,
                              children,
                              ref: _ref,
                              ...props
                            }) => {
                              const match = /language-(\w+)/.exec(
                                className || "",
                              );
                              return match ? (
                                <SyntaxHighlighter
                                  style={atomDark as any}
                                  language={match[1]}
                                  PreTag="div"
                                  className="rounded-lg my-2 text-xs"
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                              ) : (
                                <code
                                  className="bg-slate-100 px-1.5 py-0.5 rounded text-xs text-slate-800"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            },
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
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-neutral-100">
          <form
            onSubmit={handleSend}
            className="relative max-w-4xl mx-auto bg-[#FAFAF8] rounded-[2.5rem] p-1.5 shadow-sm border border-neutral-100 flex items-center gap-2 group transition-all focus-within:ring-4 focus-within:ring-[#D9A241]/10"
          >
            <div className="pl-4 text-[#D9A241]">
              <GiSparkles size={20} className="animate-pulse" />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a recipe..."
              className="flex-1 py-3 md:py-3.5 bg-transparent outline-none text-sm md:text-base text-slate-700 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-full transition-all shadow-lg ${
                input.trim() && !isLoading
                  ? "bg-[#D9A241] text-white hover:scale-105 active:scale-95 shadow-orange-200"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
              }`}
            >
              <BiSend size={20} />
            </button>
          </form>
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-neutral-50 mt-3 font-bold opacity-60">
            Powered by AI &bull; Smart Recipe Assistant
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
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .animate-bounce {
            animation: bounce 0.6s infinite;
          }
        `}</style>
      </div>
    </Modal>
  );
};

export default GenerateRecipeModal;
