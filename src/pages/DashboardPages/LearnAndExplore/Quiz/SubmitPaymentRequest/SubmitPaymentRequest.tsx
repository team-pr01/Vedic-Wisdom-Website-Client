/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useState } from "react";
import SelectDropdown from "../../../../../components/Reusable/SelectDropdown/SelectDropdown";
import TextInput from "../../../../../components/Reusable/TextInput/TextInput";
import Button from "../../../../../components/Reusable/Button/Button";
import PaymentRequestModal from "../../../../../components/Dashboard/QuizPage/SubmitPaymentRequestPage/PaymentRequestModal/PaymentRequestModal";
import { Link, useParams } from "react-router-dom";
import { useSubmitPaymentDetailsMutation } from "../../../../../redux/Features/Quiz/quizProgressApi";
import toast from "react-hot-toast";

type TPaymentFormData = {
  paymentMethod: string;
  accountNumber: string;
  accountName?: string;
  branchName?: string;
  routingNumber?: string;
};

const paymentMethods = [
  { value: "bkash", label: "bKash" },
  { value: "rocket", label: "Rocket" },
  { value: "nagad", label: "Nagad" },
  { value: "bank", label: "Bank Transfer" },
];

const SubmitPaymentRequest = () => {
  const { quizId } = useParams();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [submitPaymentDetails, { isLoading }] =
    useSubmitPaymentDetailsMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<TPaymentFormData>();

  const selectedMethod = watch("paymentMethod");
  const isBank = selectedMethod === "bank";

  const onSubmit = async (data: TPaymentFormData) => {
    try {
      const payload = {
        paymentDetails: {
          method: data.paymentMethod,
          accountNumber: data.accountNumber,
          ...(isBank && {
            accountName: data.accountName,
            branchName: data.branchName,
            routingNumber: data.routingNumber,
          }),
        },
      };

      const response = await submitPaymentDetails({
        quizId,
        data: payload,
      }).unwrap();

      if (response?.success) {
        setIsSuccessModalOpen(true);
        reset();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to submit payment details");
    }
  };

  return (
    <div className="font-Manrope max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl border border-neutral-55/30 shadow-sm">
      <h2 className="text-neutral-90 font-bold text-2xl mb-6">
        Payment Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Select Payment Method */}
        <SelectDropdown
          label="Payment Method"
          error={errors.paymentMethod}
          {...register("paymentMethod", {
            required: "Please select a payment method",
          })}
          options={paymentMethods}
        />

        {/* Bank Only Fields */}
        {isBank && (
          <>
            <TextInput
              label="Account Name"
              placeholder="Enter account name"
              error={errors.accountName}
              {...register("accountName", {
                required: "Account name is required for bank transfer",
              })}
              isRequired={true}
            />
            <TextInput
              label="Branch Name"
              placeholder="Enter branch name"
              error={errors.branchName}
              {...register("branchName", {
                required: "Branch name is required for bank transfer",
              })}
              isRequired={true}
            />

            <TextInput
              label="Routing Number"
              placeholder="Enter routing number"
              error={errors.routingNumber}
              {...register("routingNumber", {
                required: "Routing number is required for bank transfer",
              })}
              isRequired={true}
            />
          </>
        )}

        {/* Account Number - Always visible */}
        <TextInput
          label="Account Number"
          placeholder="Enter account number"
          error={errors.accountNumber}
          {...register("accountNumber", {
            required: "Account number is required",
          })}
          isRequired={true}
        />

        {/* Submit Button */}
        <div className="pt-4 flex gap-3 justify-end">
          <Link to={`/dashboard/quiz/leaderboard/${quizId}`}>
            <Button
              variant="secondary"
              label="Cancel"
              className="w-full md:w-auto px-8 py-3"
              isDisabled={isLoading}
            />
          </Link>
          <Button
            type="submit"
            label={isLoading ? "Submitting..." : "Submit Request"}
            className="w-full md:w-auto px-8 py-3"
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </div>
      </form>

      {/* --- MODAL INTEGRATION --- */}
      <PaymentRequestModal
        isModalOpen={isSuccessModalOpen}
        setIsModalOpen={setIsSuccessModalOpen}
      />
    </div>
  );
};

export default SubmitPaymentRequest;
