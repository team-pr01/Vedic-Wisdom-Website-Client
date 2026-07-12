import { FaCoins, FaCrown } from "react-icons/fa";
import Modal from "../../../Reusable/Modal/Modal";

const CoinUsages = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="p-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary-10/10 p-3 rounded-xl">
              <FaCoins className="text-primary-10 text-2xl" />
            </div>
            <div>
              <h2 className="text-neutral-90 text-xl font-bold">Coin Usages</h2>
              <p className="text-sm text-neutral-60">
                Unlock premium features with coins
              </p>
            </div>
          </div>
        </div>

        {/* Coin Balance */}
        <div className="bg-linear-to-r from-primary-10/10 to-primary-10/5 border border-primary-10/20 rounded-2xl p-4 mb-6 text-center">
          <p className="text-sm text-neutral-60">Your Coin Balance</p>
          <p className="text-3xl font-bold text-primary-10">250</p>
        </div>

        {/* Ways to Use Coins */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-neutral-90 mb-2">
            Redeem your coins for:
          </p>

          <div className="bg-white border border-neutral-20 rounded-xl p-4 flex items-center hover:shadow-md transition-shadow gap-3">
            <div className="bg-purple-500/10 p-2 rounded-lg">
              <FaCrown className="text-purple-500" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-90">
                Subscription Plans
              </h4>
              <p className="text-xs text-neutral-60">
                Redeem coins for monthly/yearly plans
              </p>
            </div>
          </div>
        </div>

        {/* How to Get Coins */}
        <div className="mt-6 p-4 bg-neutral-10/5 rounded-xl border border-neutral-20">
          <p className="text-sm font-medium text-neutral-90 mb-2">
            How to get coins?
          </p>
          <p className="text-sm text-neutral-60">
            You can purchase coins to unlock premium subscriptions and features.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-neutral-60">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-10" />
            <span>Purchase coins via secure payment</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-neutral-60">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-10" />
            <span>Redeem coins for subscription plans</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CoinUsages;
