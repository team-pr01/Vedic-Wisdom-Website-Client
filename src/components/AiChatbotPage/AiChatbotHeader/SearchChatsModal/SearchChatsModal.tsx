/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useGetMyChatHistoryQuery } from "../../../../redux/Features/Rag/aiChatApi";
import Modal from "../../../Reusable/Modal/Modal";

type SearchChatsModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const SearchChatsModal: React.FC<SearchChatsModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce logic (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(searchValue.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchValue("");
      setDebouncedKeyword("");
    }
  }, [isModalOpen]);

  const { data, isFetching, isLoading } = useGetMyChatHistoryQuery(
    { keyword: debouncedKeyword },
    { skip: !isModalOpen },
  );

  const chats = data?.data?.data || [];

  const handleClose = () => {
    setIsModalOpen(false);
    setSearchValue("");
    setDebouncedKeyword("");
  };

  const handleChatClick = (chatId: string) => {
    navigate(`/ai/chat/${chatId}`);
    handleClose();
  };

  const showEmptyState =
    debouncedKeyword.length > 0 && !isFetching && chats.length === 0;

  return (
    <Modal
      width="w-[90%] sm:w-[60%] lg:w-[40%] xl:w-[40%] 2xl:w-[30%]"
      isModalOpen={isModalOpen}
      setIsModalOpen={handleClose}
    >
      <div>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-neutral-90 text-xl font-bold">
            Search Conversations
          </h2>
          <p className="text-sm text-neutral-40 mt-1">
            Find your previous chats with the Spiritual AI Assistant.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-80"
            size={16}
          />
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search conversations..."
            className="bg-white border border-neutral-55 shadow rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-10 w-full transition-all"
          />
        </div>

        {/* Results */}
        <div className="mt-5 max-h-100 overflow-y-auto">
          {/* Loading State */}
          {(isLoading || isFetching) && debouncedKeyword.length > 0 && (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 rounded-xl bg-neutral-20 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {showEmptyState && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FiSearch className="text-neutral-60 mb-3" size={32} />
              <p className="text-neutral-90 font-medium">
                No conversations found
              </p>
              <p className="text-sm text-neutral-50 mt-1">
                Try a different keyword
              </p>
            </div>
          )}

          {/* Initial State (no keyword) */}
          {debouncedKeyword.length === 0 && !isFetching && chats.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-neutral-60 uppercase tracking-wide mb-2">
                Recent Chats
              </p>
              {chats.slice(0, 5).map((chat: any) => (
                <button
                  key={chat._id}
                  onClick={() => handleChatClick(chat._id)}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-neutral-20 transition-colors text-sm text-neutral-90 line-clamp-1"
                >
                  {chat.title || "Untitled Chat"}
                </button>
              ))}
            </div>
          )}

          {/* Search Results */}
          {!isFetching && debouncedKeyword.length > 0 && chats.length > 0 && (
            <div className="space-y-2">
              {chats.map((chat: any) => (
                <button
                  key={chat._id}
                  onClick={() => handleChatClick(chat._id)}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-neutral-20 transition-colors"
                >
                  <p className="text-sm font-medium text-neutral-90 line-clamp-1">
                    {chat.title || "Untitled Chat"}
                  </p>
                  {chat.updatedAt && (
                    <p className="text-xs text-neutral-60 mt-0.5">
                      {new Date(chat.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SearchChatsModal;
