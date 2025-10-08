import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CouseCard from "./CouseCard";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);
  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">
        Learn from the best
      </h2>
      <p className="text-sm md:text-base text-gray-500 mt-3">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        results.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {allCourses.slice(0, 4).map((course, index) => (
          <CouseCard key={index} course={course} />
        ))}
      </div>
      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className="group relative inline-block mt-6 text-gray-600 bg-white border border-gray-300 hover:border-blue-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-400 ease-out shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden"
      >
        {/* Blue shading background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out rounded-lg"></div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-600 ease-out"></div>

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
  );
};

export default CoursesSection;
