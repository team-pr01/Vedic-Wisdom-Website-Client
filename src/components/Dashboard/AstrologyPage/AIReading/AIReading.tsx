import { useState } from "react";
import Modal from "../../../Reusable/Modal/Modal";
import Button from "../../../Reusable/Button/Button";
import MuhurtaGuidance from "./MuhurtaGuidance/MuhurtaGuidance";
import KundliReading from "./KundliReading/KundliReading";

const AIReading = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedTab, setSelectedTab] = useState<
    "muhurtaGuidance" | "kundliReading"
  >("muhurtaGuidance");
  const tabButtons = [
    {
      label: "Muhurta Guidance",
      value: "muhurtaGuidance",
    },
    {
      label: "Kundli Reading",
      value: "kundliReading",
    },
  ];
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="flex flex-col items-center text-center p-4">
        <h2 className="text-neutral-90 text-2xl font-bold">
          AI Jyotish Reading
        </h2>
        <p className="text-sm text-neutral-50 font-medium mt-2 max-w-sm">
          Choose the type of astrology guidance you need.
        </p>

        <div className="flex items-center justify-center gap-4 mt-6 w-full">
          {tabButtons?.map((item) => (
            <Button
              onClick={() =>
                setSelectedTab(
                  item?.value as "muhurtaGuidance" | "kundliReading",
                )
              }
              variant={selectedTab === item?.value ? "primary" : "secondary"}
              label={item?.label}
              className="w-full"
            />
          ))}
        </div>
        <div className="w-full mt-6">
          {selectedTab === "muhurtaGuidance" && <MuhurtaGuidance />}
          {selectedTab === "kundliReading" && <KundliReading />}
        </div>
      </div>
    </Modal>
  );
};

export default AIReading;
