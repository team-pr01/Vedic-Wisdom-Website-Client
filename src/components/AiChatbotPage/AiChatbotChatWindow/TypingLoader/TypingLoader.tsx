import { motion } from "framer-motion";

const TypingLoader = () => {
  return (
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
  );
};

export default TypingLoader;
