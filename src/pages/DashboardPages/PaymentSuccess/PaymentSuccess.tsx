import { Link, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { ICONS } from "../../../assets";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-Manrope">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <FaCheckCircle className="text-4xl text-green-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-neutral-90 mb-2">
          Payment Successful!
        </h1>
        <p className="text-neutral-60 text-sm mb-6">
          Your transaction has been completed successfully.
        </p>

        <div className="bg-neutral-10/5 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-neutral-60">Transaction ID</p>
          <p className="font-semibold text-neutral-90">#{transactionId}</p>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary-button text-neutral-10 rounded-xl font-semibold hover:bg-primary-20 transition-all duration-300 w-full justify-center"
        >
          Go to Dashboard
          <img src={ICONS.arrowRight} alt="" className="w-5" />
        </Link>

        <p className="text-xs text-neutral-40 mt-4">
          Thanks for using our services.
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
