import { useForm } from "react-hook-form";
import { useState } from "react";
import SelectDropdown from "../../../../../components/Reusable/SelectDropdown/SelectDropdown";
import TextInput from "../../../../../components/Reusable/TextInput/TextInput";
import Textarea from "../../../../../components/Reusable/TextArea/TextArea";
import Button from "../../../../../components/Reusable/Button/Button";
import PaymentRequestModal from "../../../../../components/Dashboard/QuizPage/SubmitPaymentRequestPage/PaymentRequestModal/PaymentRequestModal";

type TPaymentFormData = {
  paymentMethod: string;
  accountNumber: string;
  accountName?: string;
  branchName?: string;
  note?: string;
};

const paymentMethods = [
  { value: "bkash", label: "bKash" },
  { value: "rocket", label: "Rocket" },
  { value: "nagad", label: "Nagad" },
  { value: "bank", label: "Bank Transfer" },
];

const SubmitPaymentRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
    console.log(data);
    try {
      setIsLoading(true);

      // TODO: Call your actual API here
      // await submitPaymentRequestAPI(data).unwrap();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On Success:
      setIsSuccessModalOpen(true); // <-- Open Modal here
      reset(); // Clear the form
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
          label="Select Payment Method"
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

        {/* Note - Always visible */}
        <Textarea
          label="Note (optional)"
          placeholder="Additional payment instructions."
          error={errors.note}
          {...register("note")}
          isRequired={false}
        />

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
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
