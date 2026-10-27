import { IoShieldCheckmarkOutline } from "react-icons/io5";
import Button from "../../../Reusable/Button/Button";
import FundraisingProgress from "../FundraisingProgress/FundraisingProgress";
import { ICONS } from "../../../../assets";
import DonationModal from "../../../HomePage/OurProjects/DonationModal";
import { useState } from "react";

const DonationInfo = ({
  currency,
  amountNeeded,
  amountRaised,
  projectId,
}: {
  currency: string;
  amountNeeded: number;
  amountRaised: number;
  projectId: string;
}) => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-neutral-10/10 border border-slate-50 space-y-6">
        <div>
          <h4 className="text-xs font-bold text-neutral-25 uppercase tracking-[0.2em] mb-2">
            Fundraising Status
          </h4>
          <p className="text-3xl font-black text-neutral-5">
            {currency}
            {amountRaised}{" "}
            <span className="text-sm font-medium text-neutral-10">
              raised of {currency}
              {amountNeeded}
            </span>
          </p>
        </div>

        <FundraisingProgress
          currency={currency}
          raised={amountRaised}
          goal={amountNeeded}
        />

        <Button
          label="Donate Now"
          rightIcon={ICONS.arrowRight}
          className="w-full"
          onClick={() => setIsDonateModalOpen(true)}
          isDisabled={amountRaised >= amountNeeded}
        />

        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-green-600 uppercase tracking-widest">
          <IoShieldCheckmarkOutline size={14} />
          100% Secure Transaction
        </div>
      </div>
      <DonationModal
        isModalOpen={isDonateModalOpen}
        setIsModalOpen={setIsDonateModalOpen}
        projectId={projectId}
      />
    </>
  );
};

export default DonationInfo;
