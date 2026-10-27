/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from '../../Reusable/Modal/Modal';
import TextInput from '../../Reusable/TextInput/TextInput';
import Button from '../../Reusable/Button/Button';
import { useForm } from 'react-hook-form';
import { useInitiateProjectPaymentMutation } from '../../../redux/Features/Project/projectTransactionApi';
import toast from 'react-hot-toast';
import { ICONS } from '../../../assets';
import type { Dispatch, SetStateAction } from 'react';

type TFormData = {
  name: string;
  phoneNumber: string;
  amount: string;
};

type TDonationModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  projectId: string;
};

const DonationModal: React.FC<TDonationModalProps> = ({isModalOpen, setIsModalOpen, projectId}) => {
    const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormData>();



  const [initiateProjectPayment, { isLoading }] = useInitiateProjectPaymentMutation();

  const handleInitiatePayment = async (data: TFormData) => {
    try {
      const payload = {
        projectId,
        name : data.name,
        phoneNumber : data.phoneNumber,
        amount : data.amount
      };
      const response = await initiateProjectPayment(payload).unwrap();
      
      if (response?.success) {
        if (response?.data?.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          toast.error("Payment URL not received");
        }
      } else {
        toast.error(response?.message || "Failed to initiate payment");
      }
    } catch (error: any) {
      console.error("Payment failed:", error);
      toast.error(error?.data?.message || "Payment initiation failed");
    }
  };
    return (
        <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <div className="flex flex-col items-center text-center p-4">
          <h2 className="text-neutral-90 text-2xl font-bold">
            Support Us Do Good
          </h2>
          <p className="text-sm text-neutral-50 font-medium mt-2">
            Spreading authentic Sanatan knowledge to seekers worldwide.
          </p>

          <form
            onSubmit={handleSubmit(handleInitiatePayment)}
            className="space-y-4 w-full mt-6 text-left"
          >
            <TextInput
              placeholder="Enter your full name"
              error={errors.name}
              {...register("name", {
                required: "Full name is required",
              })}
            />
            <TextInput
              placeholder="Enter your phone number"
              error={errors.phoneNumber}
              {...register("phoneNumber")}
            />
            <TextInput
              placeholder="Enter amount you want to donate in BDT (ex: 1000)"
              error={errors.amount}
              {...register("amount")}
            />
            <Button
              type="submit"
              label="Donate Now"
              rightIcon={ICONS.arrowRight}
              className="w-full"
              isLoading={isLoading}
            />
          </form>
        </div>
      </Modal>
    );
};

export default DonationModal;