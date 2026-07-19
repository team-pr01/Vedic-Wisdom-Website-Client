import { IoSearchOutline } from "react-icons/io5";
import DashboardHeading from "../../../../components/Reusable/DashboardHeading/DashboardHeading";
import { useState, useMemo } from "react";
import CourseCard from "../../../../components/Dashboard/LearnAndExplorePages/CoursePage/CourseCard/CourseCard";
import { useGetAlCoursesQuery } from "../../../../redux/Features/Course/courseApi";
import type { TCourse } from "../../../../types/course.type";
import FoodCardSkeleton from "../../../../components/SkeletonLoaders/FoodCardSkeleton/FoodCardSkeleton";
import EmptyState from "../../../../components/Reusable/EmptyState/EmptyState";

const Course = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, isLoading, isFetching } = useGetAlCoursesQuery({ keyword });
  const allCourses = data?.data?.courses || [];

  // Group courses by category
  const groupedCourses = useMemo(() => {
    const groups: { [key: string]: TCourse[] } = {};

    allCourses.forEach((course: TCourse) => {
      const category = course?.category || "Uncategorized";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(course);
    });

    return groups;
  }, [allCourses]);

  // Get unique categories
  const categories = useMemo(() => {
    return Object.keys(groupedCourses);
  }, [groupedCourses]);

  // Loading state
  if (isLoading || isFetching) {
    return (
      <div className="font-Manrope space-y-8">
        <div className="flex items-center justify-between">
          <DashboardHeading
            title="Our Courses"
            description="Explore our various spiritual courses."
          />
          <div className="relative w-full max-w-100">
            <div className="w-full h-12 bg-neutral-20 rounded-lg animate-pulse" />
          </div>
        </div>
        <div className="space-y-8">
          {[1, 2, 3].map((_, index) => (
            <div key={index}>
              <div className="h-7 bg-neutral-20 rounded w-40 animate-pulse mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {[1, 2, 3, 4].map((_, idx) => (
                  <FoodCardSkeleton key={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="font-Manrope space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <DashboardHeading
          title="Our Courses"
          description="Explore our various spiritual courses."
        />
        <div className="relative w-full sm:w-80 lg:w-100">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-10 transition duration-300 bg-white border-neutral-55"
            placeholder="Search by course name..."
            value={keyword}
          />
        </div>
      </div>

      {/* Courses by Category */}
      <div className="space-y-10">
        {categories.map((category) => (
          <div key={category}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-neutral-90 font-bold text-xl capitalize">
                {category}
              </h4>
              <span className="text-sm text-neutral-60">
                {groupedCourses[category].length} course
                {groupedCourses[category].length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {groupedCourses[category].map((course: TCourse) => (
                <CourseCard key={course?._id} course={course} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!isLoading && !isFetching && allCourses?.length === 0 && <EmptyState />}
    </div>
  );
};

export default Course;
