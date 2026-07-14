import { useState } from "react";
import Modal from "../../Reusable/Modal/Modal";
import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import UnlockCTA from "./UnlockCTA";
import HowToGetLifetimePremiumMembership from "./HowToGetLifetimePremiumMembership";

const LifetimePremiumMembershipModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [step, setStep] = useState<number>(1);
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      {/* <UnlockCTA/> */}
      <HowToGetLifetimePremiumMembership/>
    </Modal>
  );
};

export default LifetimePremiumMembershipModal;
