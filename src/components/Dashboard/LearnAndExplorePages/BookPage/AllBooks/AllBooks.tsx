/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import FilterDropdown from "../../../SanathanSthalPage/Filters/FilterDropdown";
import BookCard from "../BookCard/BookCard";
import { useGetAllBooksQuery } from "../../../../../redux/Features/Book/bookApi";
import type { TBooks } from "../../../../../types/books.type";
import BookCardSkeleton from "../../../../SkeletonLoaders/BookCardSkeleton/BookCardSkeleton";

const AllBooks = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { data, isLoading } = useGetAllBooksQuery({ keyword, category });
  const allBooks = data?.data?.data || [];
  const categoryOptions = [
    { label: "All Temples", value: "all" },
    { label: "Ganesh Temple", value: "ganesh" },
    { label: "Durga Temple", value: "durga" },
    { label: "Shiva Temple", value: "shiva" },
    { label: "Vishnu Temple", value: "vishnu" },
    { label: "Krishna Temple", value: "krishna" },
    { label: "Hanuman Temple", value: "hanuman" },
    { label: "Saraswati Temple", value: "saraswati" },
    { label: "Lakshmi Temple", value: "lakshmi" },
    { label: "Kali Temple", value: "kali" },
    { label: "Ram Temple", value: "ram" },
    { label: "Sita Temple", value: "sita" },
    { label: "Radha Krishna Temple", value: "radha-krishna" },
    { label: "Jagannath Temple", value: "jagannath" },
    { label: "Venkateswara Temple", value: "venkateswara" },
    { label: "Murugan Temple", value: "murugan" },
    { label: "Ayyappa Temple", value: "ayyappa" },
    { label: "Sai Baba Temple", value: "sai-baba" },
    { label: "Mata Temple", value: "mata" },
    { label: "Navagraha Temple", value: "navagraha" },
    { label: "Panchayatana Temple", value: "panchayatana" },
    { label: "Ashram", value: "ashram" },
    { label: "Gurudwara", value: "gurudwara" },
  ];
  const handleCategorySelect = (selected: any) => {
    setCategory(selected);
  };
  return (
    <div className="py-6">
      <div className="flex items-center justify-between gap-5 mt-6">
        <div className="relative w-full">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-55"
            placeholder="Search by product name..."
          />
        </div>
        <FilterDropdown
          options={categoryOptions}
          value={category}
          onChange={handleCategorySelect}
          isRequired={false}
          placeholder="Select category"
          dropdownDirection="top-full"
        />
      </div>

      <div className="grid grid-cols-6 gap-4 mt-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <BookCardSkeleton key={index} />
            ))
          : allBooks?.map((book: TBooks) => (
              <BookCard key={book?._id} book={book} />
            ))}
      </div>
    </div>
  );
};

export default AllBooks;
