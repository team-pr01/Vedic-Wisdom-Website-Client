import { IoSearchOutline } from "react-icons/io5";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import { useState } from "react";
import CourseCard from "../../../../components/Dashboard/LearnAndExplorePages/CoursePage/CourseCard/CourseCard";

const Course = () => {
  const [keyword, setKeyword] = useState<string>("");
  return (
    <div className="font-Manrope space-y-8">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title="Our Courses"
          description="Explore our various spiritual courses."
        />
        <div className="relative w-full max-w-100">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-55"
            placeholder="Search by course name..."
          />
        </div>
      </div>

      <div>
        <h4 className="text-neutral-90 font-bold text-xl">Development</h4>
        <div className="grid grid-cols-4 gap-5 mt-2">
          {[1, 2, 3, 4, 5]?.map((_, index) => (
            <CourseCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
