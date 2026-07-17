import { IoSearchOutline } from "react-icons/io5";
import Modal from "../../Reusable/Modal/Modal";
import { useState } from "react";
import { SUPPORTED_LANGUAGES } from "../../../data/languages";

type TSelectSystemLanguageProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
};
const SelectSystemLanguage: React.FC<TSelectSystemLanguageProps> = ({
  isModalOpen,
  setIsModalOpen,
  setSelectedLanguage,
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const filteredLanguages = SUPPORTED_LANGUAGES?.filter((language) => {
    return (
      language?.name?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
      language?.code?.toLowerCase()?.includes(keyword?.toLowerCase())
    );
  });
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <h2 className="text-neutral-90 text-xl font-bold">Select Language</h2>

      <div className="relative w-full mt-4">
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-55"
          placeholder="Search by product name..."
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {filteredLanguages?.map((language) => (
          <button
            key={language?.code}
            onClick={() => {
              setSelectedLanguage(language?.code);
              setIsModalOpen(false);
            }}
            className="w-full px-4 py-3.5 rounded-lg border bg-white hover:bg-primary-10 hover:text-white transition duration-300 border-neutral-55 text-left"
          >
            {language?.name}
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default SelectSystemLanguage;
