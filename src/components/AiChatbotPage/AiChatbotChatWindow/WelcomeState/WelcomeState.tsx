import { ICONS } from "../../../../assets";
import { motion } from "framer-motion";

const WelcomeState = () => {
  return (
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
  );
};

export default WelcomeState;
