import { useState } from "react";
import { FaCoins, FaShieldAlt, FaLock } from "react-icons/fa";
import Modal from "../../../Reusable/Modal/Modal";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import { useGetAllCoinPackagesQuery } from "../../../../redux/Features/Coin/coinPackageApi";
import type { TCoinPackage } from "../../../../types/coinPackage.type";

interface DepositCoinProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DepositCoin = ({ isModalOpen, setIsModalOpen }: DepositCoinProps) => {
  const { data } = useGetAllCoinPackagesQuery({});
  const coinPackages = data?.data?.packages || [];
  const [selectedPackage, setSelectedPackage] = useState<TCoinPackage | null>(
    null,
  );
  const isLoading = false;

  // 1 Coin = 5 BDT
  const COIN_RATE = 5;

  // const handlePayment = async () => {
  //   if (!setSelectedPackage) return;

  //   setIsProcessing(true);
  //   try {
  //     const packageData = coinPackages.find((p) => p.coins === selectedCoins);
  //     const amount = packageData?.price || selectedCoins * COIN_RATE;
  //     console.log("Processing payment for:", {
  //       coins: selectedCoins,
  //       amount: amount,
  //       currency: "BDT",
  //     });
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     alert(`Successfully added ${selectedCoins} Arya Coins!`);
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.error("Payment failed:", error);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="p-2">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary-10/10 p-3 rounded-xl">
            <FaCoins className="text-primary-10 text-2xl" />
          </div>
          <div>
            <h2 className="text-neutral-90 text-xl font-bold">
              Add Arya Coins
            </h2>
            <p className="text-sm text-neutral-60">1 Coin = {COIN_RATE} BDT</p>
          </div>
        </div>

        {/* Coin Packages */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-neutral-90">
            Select Coin Package
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {coinPackages.map((pkg: TCoinPackage) => (
              <button
                key={pkg?._id}
                onClick={() => setSelectedPackage(pkg)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                  selectedPackage?._id === pkg?._id
                    ? "border-primary-10 bg-primary-10/10 shadow-md"
                    : "border-neutral-20 hover:border-primary-10/50 hover:bg-neutral-10/5"
                }`}
              >
                {pkg?.discountPercentage > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    Save {pkg?.discountPercentage}%
                  </span>
                )}
                <p className="text-xl font-bold text-neutral-90 flex items-center justify-center gap-1">
                  <FaCoins className="text-primary-10 text-sm" />
                  {pkg?.amount}
                </p>
                <p className="text-sm font-semibold text-primary-10 mt-1">
                  ৳{pkg?.discountedPrice}
                </p>
                <p className="text-xs text-neutral-40 line-through">
                  ৳{pkg?.basePrice}
                </p>
                <p className="text-xs text-neutral-60 mt-1">
                  {pkg?.pricePerCoin} BDT/coin
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount Input */}
        {/* <div className="mt-4">
          <p className="text-sm font-medium text-neutral-90 mb-2">
            Or Enter Custom Amount
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center bg-white border border-neutral-20 rounded-xl px-4 py-2.5">
              <FaCoins className="text-primary-10 text-lg mr-2" />
              <input
                type="number"
                placeholder="Enter coins"
                className="w-full outline-none text-neutral-90 text-sm"
                min="1"
                onChange={(e) =>
                  setSelectedPackage(parseInt(e.target.value) || null)
                }
              />
            </div>
            <div className="bg-neutral-10/5 px-4 py-2.5 rounded-xl border border-neutral-20">
              <p className="text-sm text-neutral-60">
                ৳{selectedPackage?.discountedPrice}
              </p>
            </div>
          </div>
        </div> */}

        {/* Payment Summary */}
        {selectedPackage && (
          <div className="mt-4 p-4 bg-neutral-10/5 rounded-xl border border-neutral-20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-60">Total Coins</p>
                <p className="text-lg font-bold text-neutral-90 flex items-center gap-1">
                  <FaCoins className="text-primary-10" />
                  {selectedPackage?.amount}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-60">Total Amount</p>
                <p className="text-lg font-bold text-primary-10">
                  ৳{selectedPackage?.discountedPrice}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          label={isLoading ? "Processing..." : "Add Coins"}
          className="w-full mt-4"
          rightIcon={ICONS.arrowRight}
          // onClick={handlePayment}
          isDisabled={!selectedPackage || isLoading}
        />

        {/* Secure Payment Notice */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-neutral-40">
          <div className="flex items-center gap-1">
            <FaLock className="text-primary-10" />
            <span>Secure Payment</span>
          </div>
          <div className="w-px h-4 bg-neutral-30" />
          <div className="flex items-center gap-1">
            <FaShieldAlt className="text-primary-10" />
            <span>SSL Commerz</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DepositCoin;
