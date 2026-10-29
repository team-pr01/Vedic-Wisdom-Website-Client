import React from "react";
import Button from "../../../components/Reusable/Button/Button"; // Adjust path as needed
import Modal from "../../../components/Reusable/Modal/Modal"; // Adjust path as needed
import { IMAGES } from "../../../assets"; // Adjust path as needed

type TConfirmationModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
  variant?: "primary" | "danger";
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

const ConfirmationModal = ({
  isModalOpen,
  setIsModalOpen,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  variant = "primary",
  onConfirm,
  isLoading = false,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
}: TConfirmationModalProps) => {
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="flex flex-col items-center text-center pt-10 pb-5">
        {/* Conditionally show danger image only for delete/danger variants */}
        {variant === "danger" ? (
          <img src={IMAGES.dangerSign} alt="Warning" className="w-1/3 mx-auto" />
        ) : (
          <div className="w-20 h-20 bg-primary-10/10 rounded-full flex items-center justify-center mb-4">
            {/* You can add a generic info/question icon here if you have one */}
            <span className="text-3xl text-primary-10">?</span>
          </div>
        )}

        <h2 className="text-neutral-90 text-2xl font-bold mt-6">{title}</h2>
        <p className="text-sm text-neutral-50 font-medium mt-2 max-w-sm">
          {description}
        </p>

        <div className="flex items-center gap-3 justify-center mt-6 w-full">
          <Button
            variant="secondary"
            label={cancelButtonText}
            onClick={() => setIsModalOpen(false)}
            isDisabled={isLoading}
            className="w-1/2" // Optional: make buttons equal width
          />
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            variant={variant}
            label={confirmButtonText}
            onClick={onConfirm}
            className="w-1/2" // Optional: make buttons equal width
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;