import { useState } from "react";
import Modal from "../../Reusable/Modal/Modal";
import UnlockCTA from "./UnlockCTA";
import HowToGetLifetimePremiumMembership from "./HowToGetLifetimePremiumMembership";
import ReferralOnboarding from "./ReferralOnboarding/ReferralOnboarding";

const LifetimePremiumMembershipModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [contentType, setContentType] = useState<
    "unlockCta" | "howToGet" | "referralOnboarding"
  >("unlockCta");
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      {contentType === "unlockCta" && (
        <UnlockCTA setContentType={setContentType} />
      )}
      {contentType === "howToGet" && (
        <HowToGetLifetimePremiumMembership setContentType={setContentType} />
      )}
      {contentType === "referralOnboarding" && <ReferralOnboarding setIsModalOpen={setIsModalOpen} />}
    </Modal>
  );
};

export default LifetimePremiumMembershipModal;
