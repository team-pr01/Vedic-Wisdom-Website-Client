import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ICONS } from "../../../../../assets";
import Breadcrumb from "../../../../../components/Reusable/Breadcrumb/Breadcrumb";

const BookDetails = () => {
  return (
    <div className="font-Manrope">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          {
            label: "Book",
            path: "/dashboard/learn-and-explore/book",
          },
          {
            label: "Book Name",
            path: "/dashboard/learn-and-explore/book/1",
          },
        ]}
      />

      <h4 className="text-neutral-90 font-bold text-xl mt-8">Bhagavad Gita</h4>
      <div className="flex gap-10 mt-3">
        <div className="w-[70%]">
          <div className="bg-white border border-neutral-55 p-4 rounded-2xl">
            <p className="text-neutral-50 mt-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
              dolore excepturi mollitia officiis. Iste debitis natus provident
              perferendis tempora magnam, corporis ducimus! Aliquam natus illum,
              temporibus optio ea magnam odit sunt voluptates officia impedit
              molestias in asperiores, ipsa ex quaerat? Laudantium soluta
              excepturi dolores quam sunt labore iste autem voluptatum!
            </p>
            <p className="text-neutral-50 mt-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
              dolore excepturi mollitia officiis. Iste debitis natus provident
              perferendis tempora magnam, corporis ducimus! Aliquam natus illum,
              temporibus optio ea magnam odit sunt voluptates officia impedit
              molestias in asperiores, ipsa ex quaerat? Laudantium soluta
              excepturi dolores quam sunt labore iste autem voluptatum!
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-55 hover:bg-primary-10 hover:text-white hover:border-primary-10 transition-all duration-300 group">
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-10 text-white hover:bg-primary-10/90 transition-all duration-300 group shadow-md hover:shadow-lg">
              Next
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="w-[30%]">
          <div className="bg-white border border-neutral-55 p-3 rounded-2xl flex flex-col gap-2">
            <button className="text-neutral-90 font-semibold text-sm 2xl:text-base flex items-center justify-between p-3 rounded-md bg-neutral-70 border border-neutral-55">
              Chapter 1
              <MdOutlineKeyboardArrowDown className="text-2xl" />
            </button>
            <button className="text-neutral-90 font-semibold text-sm 2xl:text-base flex items-center justify-between p-3 rounded-md bg-neutral-70 border border-neutral-55">
              Verse 1
              <MdOutlineKeyboardArrowDown className="text-2xl" />
            </button>
          </div>

          <div className="bg-neutral-70 border border-primary-20 shadow-book-filter flex flex-col gap-4 p-3 rounded-2xl mt-4">
            <button className="flex items-center gap-2">
              <div className="border border-primary-10/80 size-10 rounded-full flex items-center justify-center p-2">
                <img src={ICONS.bookmark} alt="" />
              </div>
              <p className="text-neutral-90 font-semibold text-sm 2xl:text-base">
                Bookmark
              </p>
            </button>
            <button className="flex items-center gap-2">
              <div className="border border-primary-10/80 size-10 rounded-full flex items-center justify-center p-2">
                <img src={ICONS.translate} alt="" />
              </div>
              <p className="text-neutral-90 font-semibold text-sm 2xl:text-base">
                Translate
              </p>
            </button>
            <button className="flex items-center gap-2">
              <div className="border border-primary-10/80 size-10 rounded-full flex items-center justify-center p-2">
                <img src={ICONS.reportIssue} alt="" />
              </div>
              <p className="text-neutral-90 font-semibold text-sm 2xl:text-base">
                Report Issue
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
