import Modal from "../../../../../Reusable/Modal/Modal";
import { FaCoins, FaLock } from "react-icons/fa";
import Button from "../../../../../Reusable/Button/Button";
import { useGetSingleAudioBookByIdQuery } from "../../../../../../redux/Features/AudioBook/audioBookApi";
import { ICONS, IMAGES } from "../../../../../../assets";
import { usePurchaseAudioBookMutation } from "../../../../../../redux/Features/AudioBook/audioBookPurchaseApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PurchaseAudioBookModal = ({
  isModalOpen,
  setIsModalOpen,
  audioBookId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  audioBookId: string;
}) => {
  const navigate = useNavigate();
  const { data } = useGetSingleAudioBookByIdQuery(audioBookId);
  const book = data?.data;

  const [purchaseAudioBook, { isLoading }] = usePurchaseAudioBookMutation();
  const handlePurchaseAudioBook = async () => {
    try {
      const payload = {
        audioBookId,
      };
      const response = await purchaseAudioBook(payload).unwrap();
      if (response?.success) {
        navigate("/dashboard/my-profile");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="p-2 font-Manrope">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
            <FaCoins className="text-amber-500 text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-90">
              Purchase Audio Book
            </h2>
            <p className="text-sm text-neutral-60">Unlock premium content</p>
          </div>
        </div>

        {/* Book Details */}
        <div className="bg-neutral-10/5 rounded-2xl p-2 border border-neutral-20">
          <div className="flex gap-4">
            {/* Book Image */}
            <img
              src={book?.thumbnailUrl || IMAGES.imagePlaceholder}
              alt={book?.name || "Audio Book"}
              className="w-24 h-24 rounded-xl object-cover"
            />

            {/* Book Info */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-neutral-90">
                {book?.name}
              </h3>
              <p className="text-sm text-neutral-60 capitalize">
                {book?.category}
              </p>

              {/* Coin Price */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                  <FaCoins className="text-amber-500 text-sm" />
                  <span className="font-semibold text-amber-700">
                    {book?.coinPrice || 0} coins
                  </span>
                </div>
                <span className="text-neutral-40 font-medium">• Premium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="mt-4 bg-white border border-neutral-20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-60">Price</span>
            <span className="text-sm font-semibold text-neutral-90">
              {book?.coinPrice || 0} coins
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-neutral-60">Status</span>
            <span className="text-sm font-semibold text-green-600">
              Available
            </span>
          </div>
        </div>

        {/* Note */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-2">
            <FaLock className="text-amber-500 text-sm mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-700">
                Non-refundable Purchase
              </p>
              <p className="text-xs text-amber-600 mt-0.5">
                Once purchased, this audio book cannot be refunded and coins
                cannot be reverted. Please ensure you want to proceed.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center flex-col sm:flex-row gap-3 mt-6">
          <Button
            variant="secondary"
            label={`Cancel`}
            onClick={() => setIsModalOpen(false)}
          />
          <Button
            label={`Unlock for ${book?.coinPrice || 0} coins`}
            leftIcon={ICONS.coin}
            onClick={handlePurchaseAudioBook}
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </div>

        {/* Footer Note */}
        <p className="text-xs text-center text-neutral-40 mt-4">
          You will have lifetime access to this audio book after purchase
        </p>
      </div>
    </Modal>
  );
};

export default PurchaseAudioBookModal;
