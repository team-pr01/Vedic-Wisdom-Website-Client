import { IoSearchOutline } from "react-icons/io5";
import Modal from "../../../Reusable/Modal/Modal";
import { useState } from "react";
import { SUPPORTED_LANGUAGES } from "../../../../data/languages";

type TSChangeNewsLanguageProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedLanguageCode: React.Dispatch<React.SetStateAction<string | null>>;
};

const ChangeNewsLanguage: React.FC<TSChangeNewsLanguageProps> = ({
  isModalOpen,
  setIsModalOpen,
  setSelectedLanguageCode,
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
          placeholder="Search by language name..."
          value={keyword}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredLanguages?.length > 0 ? (
          filteredLanguages?.map((language) => {

            return (
              <button
                key={language?.code}
                onClick={() => {
                  setSelectedLanguageCode(language?.code);
                }}
                className={`w-full px-4 py-3.5 rounded-lg border transition duration-300 text-left flex items-center justify-between bg-white hover:bg-primary-10 hover:text-white border-neutral-55`}
              >
                <span>{language?.name}</span>
              </button>
            );
          })
        ) : (
          <div className="text-center py-8 text-neutral-40">
            <p>No languages found</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ChangeNewsLanguage;
