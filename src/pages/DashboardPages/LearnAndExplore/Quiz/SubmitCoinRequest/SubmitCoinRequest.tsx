/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCoins } from "react-icons/fa";
import { useSubmitCoinRequestMutation } from "../../../../../redux/Features/Quiz/quizProgressApi";
import Button from "../../../../../components/Reusable/Button/Button";
import CoinsRequestModal from "../../../../../components/Dashboard/QuizPage/CoinsRequestModal/CoinsRequestModal";

const COIN_RATE = 5; // 1 Unit of Currency = 5 Coins

const SubmitCoinRequest = () => {
  const { quizId } = useParams();
  const [searchParams] = useSearchParams();

  const currency = searchParams.get("currency");
  const prizeAmountString = searchParams.get("prizeAmount");
  const prizeAmount = Number(prizeAmountString) || 0;

  const totalCoins = prizeAmount / COIN_RATE;

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [submitCoinRequest, { isLoading }] = useSubmitCoinRequestMutation();

  const handleSubmit = async () => {
    try {
      const response = await submitCoinRequest({
        quizId,
      }).unwrap();

      if (response?.success) {
        setIsSuccessModalOpen(true);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to submit coin request");
    }
  };

  return (
    <div className="font-Manrope max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl border border-neutral-55/30 shadow-sm mt-10">
      <h2 className="text-neutral-90 font-bold text-2xl mb-6">
        Convert Prize to Coins
      </h2>

      {/* Summary Box */}
      <div className="bg-[#FCF9F2] border border-[#F2E8D9] rounded-2xl p-6 mb-8 flex flex-col items-center text-center">
        <p className="text-neutral-50 font-medium mb-2">Your Prize Amount</p>
        <h3 className="text-3xl font-bold text-neutral-90 mb-6">
          {currency}
          {prizeAmount}
        </h3>

        {/* Conversion Info */}
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-xl border border-neutral-100 shadow-sm">
          <div className="flex flex-col items-center">
            <span className="text-xs text-neutral-50 uppercase">Rate</span>
            <span className="font-bold text-neutral-90">
              1 Coin = {COIN_RATE} BDT
            </span>
          </div>
          <div className="w-px h-8 bg-neutral-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-primary-10 uppercase font-bold">
              You Receive
            </span>
            <span className="font-bold text-2xl text-[#F0B741] flex items-center gap-1">
              <FaCoins className="text-xl" /> {totalCoins.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-neutral-50 text-center mb-8">
        By submitting this request, the prize amount will be converted into
        coins and added to your profile after admin review.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to={`/dashboard/quiz/leaderboard/${quizId}`}
          className="w-full sm:w-1/2"
        >
          <Button
            variant="secondary"
            label="Cancel"
            className="w-full py-3"
            isDisabled={isLoading}
          />
        </Link>
        <Button
          onClick={handleSubmit}
          label={isLoading ? "Submitting..." : "Submit Request"}
          className="w-full sm:w-1/2 py-3 bg-[#F0B741] hover:bg-[#dca52d] border-none text-white font-bold"
          isLoading={isLoading}
          isDisabled={isLoading || totalCoins <= 0}
        />
      </div>

      {/* Success Modal */}
      <CoinsRequestModal
        isModalOpen={isSuccessModalOpen}
        setIsModalOpen={setIsSuccessModalOpen}
      />
    </div>
  );
};

export default SubmitCoinRequest;
