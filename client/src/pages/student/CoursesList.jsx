import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams, useNavigate } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
const CoursesList = () => {
  const { allCourses } = useContext(AppContext);
  const { input } = useParams();
  const navigate = useNavigate();
  const [filteredCourse, setFilteredCourse] = useState(allCourses);
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);
  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            {" "}
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                onClick={() => navigate("/")}
                className="text-blue-600 cursor-pointer"
              >
                Home
              </span>{" "}
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        {input && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mt-8 mb-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">
                  Search results for:
                </span>
                <span className="text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded-full text-sm">
                  "{input}"
                </span>
              </div>
              <span className="text-gray-400 text-sm">
                ({filteredCourse.length}{" "}
                {filteredCourse.length === 1 ? "course" : "courses"} found)
              </span>
            </div>
            <button
              onClick={() => navigate(`/course-list`)}
              className="flex items-center gap-2 text-gray-500 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200 group"
              title="Clear search"
            >
              <img
                src={assets.cross_icon}
                alt="Clear search"
                className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
              />
              <span className="text-sm font-medium">Clear</span>
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0 ">
          {filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CoursesList;
