import { IMAGES } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import Modal from "../../../Reusable/Modal/Modal";

const DeleteAccountConfirmation = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="flex flex-col items-center text-center pt-10 pb-5">
        <img src={IMAGES.dangerSign} alt="" className="w-1/3 mx-auto" />
        <h2 className="text-neutral-90 text-2xl font-bold mt-6">
          Delete Account
        </h2>
        <p className="text-sm text-neutral-50 font-medium mt-2">
          Are you sure you want to delete your account? This action is
          irreversible and cannot be undone.
        </p>

        <div className="flex items-center gap-3 justify-center mt-6">
          <Button variant="secondary" label="Cancel" />
          <Button variant="danger" label="Yes, Delete" />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountConfirmation;
