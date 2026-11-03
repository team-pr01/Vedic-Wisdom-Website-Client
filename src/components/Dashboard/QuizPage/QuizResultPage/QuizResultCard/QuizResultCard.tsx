/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaCrown,
} from "react-icons/fa";
import Button from "../../../../../components/Reusable/Button/Button";

const QuizResultCard = ({ result }: { result: any }) => {
  const totalLevels = result?.quizId?.levels?.length || 0;
  const accuracy =
    result.totalScore > 0
      ? Math.round(
          (result.totalCorrectAnswers / (result.totalScore / 10)) * 100,
        )
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-neutral-55 overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative"
    >
      {/* Decorative Header Background */}
      <div className="h-24 bg-linear-to-r from-[#FDF8F1] to-[#F5E6CC] relative">
        {result.isCompleted && (
          <div className="absolute top-4 right-4 bg-primary-10 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <FaCrown /> Completed
          </div>
        )}
      </div>

      <div className="p-6 relative">
        {/* Title & Icon */}
        <div className="flex items-start gap-4 -mt-12 mb-6">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-neutral-100 flex items-center justify-center shrink-0">
            <FaTrophy className="text-3xl text-primary-10" />
          </div>
          <div className="pt-2">
            <h3 className="text-xl font-bold text-neutral-90 leading-tight">
              {result.quizId.name}
            </h3>
            <p className="text-sm text-neutral-50 mt-1">
              Level {result.currentLevel} of {totalLevels}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-neutral-20/60 p-3 rounded-xl border border-neutral-50/10 flex flex-col items-center justify-center text-center">
            <FaChartLine className="text-primary-10 mb-1" />
            <span className="text-xl font-bold text-neutral-90">
              {result.totalScore}
            </span>
            <span className="text-[10px] text-neutral-50 uppercase font-semibold tracking-wider">
              Score
            </span>
          </div>

          <div className="bg-neutral-20/60 p-3 rounded-xl border border-neutral-50/10 flex flex-col items-center justify-center text-center">
            <FaCheckCircle className="text-green-500 mb-1" />
            <span className="text-xl font-bold text-neutral-90">
              {accuracy}%
            </span>
            <span className="text-[10px] text-neutral-50 uppercase font-semibold tracking-wider">
              Accuracy
            </span>
          </div>

          <div className="bg-neutral-20/60 p-3 rounded-xl border border-neutral-50/10 flex flex-col items-center justify-center text-center">
            <FaClock className="text-blue-500 mb-1" />
            <span className="text-xl font-bold text-neutral-90">
              {result.overallTimeTaken}s
            </span>
            <span className="text-[10px] text-neutral-50 uppercase font-semibold tracking-wider">
              Time
            </span>
          </div>
        </div>

        {/* Action Button */}

        <Link
          to={`/dashboard/quiz/leaderboard/${result?.quizId?._id}`}
          className="w-full"
        >
          <Button
            label="View Leaderboard"
            variant="primary"
            className="w-full"
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default QuizResultCard;
