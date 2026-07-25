import { Link } from "react-router-dom";
import { FaTimesCircle, FaRedo } from "react-icons/fa";
import { motion } from "framer-motion";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-Manrope">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        {/* Failed Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6"
        >
          <FaTimesCircle className="text-4xl text-red-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-neutral-90 mb-3">
          Payment Failed!
        </h1>

        <div className="bg-red-50 rounded-xl p-4 mb-6 text-left border border-red-200">
          <p className="text-sm text-red-600">
            Your payment could not be processed. Please try again.
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/payment")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary-button text-neutral-10 rounded-xl font-semibold hover:bg-primary-20 transition-all duration-300 w-full justify-center"
        >
          <FaRedo className="text-sm" />
          Try Again
        </button>

        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-neutral-50 hover:text-neutral-90 transition-colors w-full mt-2 text-sm"
        >
          Go to Dashboard
        </Link>

        <p className="text-xs text-neutral-40 mt-4">
          Need help? Contact our support team.
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
