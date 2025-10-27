import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);
  return (
    <div className="relative py-20 md:px-8 px-6 bg-gradient-to-b from-sky-50/60 to-white overflow-hidden">
      {/* decorative blur blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <span className="inline-block text-[10px] md:text-xs uppercase tracking-widest font-semibold text-blue-700/80 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Popular Courses
          </span>
          <h2 className="mt-4 text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Learn from the best
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 mt-3">
            Discover our top-rated courses across various categories. From
            coding and design to business and wellness, our courses are crafted
            to deliver results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-10">
          {allCourses.slice(0, 4).map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/course-list"
            onClick={() => scrollTo(0, 0)}
            className="group relative inline-flex items-center mt-10 text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ease-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden"
          >
            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 ease-out" />

            {/* Button text with icon */}
            <span className="relative z-10 flex items-center gap-2">
              Show all courses
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
