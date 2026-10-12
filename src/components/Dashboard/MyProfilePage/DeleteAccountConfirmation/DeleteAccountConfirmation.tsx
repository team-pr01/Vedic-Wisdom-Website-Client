/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IMAGES } from "../../../../assets";
import { useDeleteAccountMutation } from "../../../../redux/Features/User/userApi";
import Button from "../../../Reusable/Button/Button";
import Modal from "../../../Reusable/Modal/Modal";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../../../../redux/Features/Auth/authSlice";

const DeleteAccountConfirmation = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const handleLogout = async () => {
      dispatch(setUser({ user: null, token: null }));
      dispatch(logout());
      localStorage.clear();
      navigate("/signin");
    };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteAccount({}).unwrap();
      if (response?.success) {
        toast.success("Account deleted successfully");
        handleLogout();
        setIsModalOpen(false);
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete account");
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="flex flex-col items-center text-center pt-10 pb-5">
        <img src={IMAGES.dangerSign} alt="" className="w-1/3 mx-auto" />
        <h2 className="text-neutral-90 text-2xl font-bold mt-6">
          Delete Account
        </h2>
        <p className="text-sm text-neutral-50 font-medium mt-2 max-w-sm">
          Are you sure you want to delete your account? This action is
          irreversible and cannot be undone.
        </p>

        <div className="flex items-center gap-3 justify-center mt-6">
          <Button
            variant="secondary"
            label="Cancel"
            onClick={() => setIsModalOpen(false)}
            isDisabled={isLoading}
          />
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            variant="danger"
            label="Yes, Delete"
            onClick={handleDeleteAccount}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountConfirmation;