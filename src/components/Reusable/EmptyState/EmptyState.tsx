import { FaSearch } from "react-icons/fa";

const EmptyState = () => {
  return (
    <div className="mt-12 text-center">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-neutral-10/10 flex items-center justify-center mb-4">
          <FaSearch className="text-4xl text-neutral-30" />
        </div>
        <h4 className="text-lg font-semibold text-neutral-90">
          No Result Found
        </h4>
        <p className="text-sm text-neutral-60 mt-2 max-w-sm">
          There are no data available at the moment. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
