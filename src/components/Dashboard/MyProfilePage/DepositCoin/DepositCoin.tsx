import { useState } from "react";
import { FaCoins, FaShieldAlt, FaLock } from "react-icons/fa";
import Modal from "../../../Reusable/Modal/Modal";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";

interface DepositCoinProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DepositCoin = ({ isModalOpen, setIsModalOpen }: DepositCoinProps) => {
  const [selectedCoins, setSelectedCoins] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Coin packages
  const coinPackages = [
    { coins: 50, price: 250, discount: 0 },
    { coins: 100, price: 480, discount: 4 },
    { coins: 250, price: 1125, discount: 10 },
    { coins: 500, price: 2125, discount: 15 },
    { coins: 1000, price: 4000, discount: 20 },
    { coins: 2000, price: 7500, discount: 25 },
  ];

  // 1 Coin = 5 BDT
  const COIN_RATE = 5;

  const handleSelectPackage = (coins: number) => {
    setSelectedCoins(coins);
  };

  const handlePayment = async () => {
    if (!selectedCoins) return;
    
    setIsProcessing(true);
    try {
      // Calculate amount
      const packageData = coinPackages.find(p => p.coins === selectedCoins);
      const amount = packageData?.price || selectedCoins * COIN_RATE;
      
      // Here you will integrate SSL Commerz
      console.log("Processing payment for:", {
        coins: selectedCoins,
        amount: amount,
        currency: "BDT"
      });
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // On success, show success message or close modal
      alert(`Successfully added ${selectedCoins} Arya Coins!`);
      setIsModalOpen(false);
      
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="p-2">
        {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary-10/10 p-3 rounded-xl">
              <FaCoins className="text-primary-10 text-2xl" />
            </div>
            <div>
              <h2 className="text-neutral-90 text-xl font-bold">Add Arya Coins</h2>
              <p className="text-sm text-neutral-60">
                1 Coin = {COIN_RATE} BDT
              </p>
            </div>
          </div>

        {/* Coin Packages */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-neutral-90">Select Coin Package</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {coinPackages.map((pkg) => (
              <button
                key={pkg.coins}
                onClick={() => handleSelectPackage(pkg.coins)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                  selectedCoins === pkg.coins
                    ? "border-primary-10 bg-primary-10/10 shadow-md"
                    : "border-neutral-20 hover:border-primary-10/50 hover:bg-neutral-10/5"
                }`}
              >
                {pkg.discount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    Save {pkg.discount}%
                  </span>
                )}
                <p className="text-xl font-bold text-neutral-90 flex items-center justify-center gap-1">
                  <FaCoins className="text-primary-10 text-sm" />
                  {pkg.coins}
                </p>
                <p className="text-sm font-semibold text-primary-10 mt-1">
                  ৳{pkg.price}
                </p>
                {pkg.discount > 0 && (
                  <p className="text-xs text-neutral-40 line-through">
                    ৳{pkg.coins * COIN_RATE}
                  </p>
                )}
                <p className="text-xs text-neutral-60 mt-1">
                  {pkg.price / pkg.coins} BDT/coin
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount Input */}
        <div className="mt-4">
          <p className="text-sm font-medium text-neutral-90 mb-2">Or Enter Custom Amount</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center bg-white border border-neutral-20 rounded-xl px-4 py-2.5">
              <FaCoins className="text-primary-10 text-lg mr-2" />
              <input
                type="number"
                placeholder="Enter coins"
                className="w-full outline-none text-neutral-90 text-sm"
                min="1"
                onChange={(e) => setSelectedCoins(parseInt(e.target.value) || null)}
              />
            </div>
            <div className="bg-neutral-10/5 px-4 py-2.5 rounded-xl border border-neutral-20">
              <p className="text-sm text-neutral-60">
                ৳{selectedCoins ? selectedCoins * COIN_RATE : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        {selectedCoins && (
          <div className="mt-4 p-4 bg-neutral-10/5 rounded-xl border border-neutral-20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-60">Total Coins</p>
                <p className="text-lg font-bold text-neutral-90 flex items-center gap-1">
                  <FaCoins className="text-primary-10" />
                  {selectedCoins}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-60">Total Amount</p>
                <p className="text-lg font-bold text-primary-10">
                  ৳{coinPackages.find(p => p.coins === selectedCoins)?.price || selectedCoins * COIN_RATE}
                </p>
              </div>
            </div>
          </div>
        )}

        

        {/* Action Button */}
        <Button
          label={isProcessing ? "Processing..." : "Add Coins"}
          className="w-full mt-4"
          rightIcon={ICONS.arrowRight}
          onClick={handlePayment}
          isDisabled={!selectedCoins || isProcessing}
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