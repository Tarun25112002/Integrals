import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { allCourses, calculateRating } = useContext(AppContext);
  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    if (allCourses.length > 0) {
      fetchCourseData();
    }
  }, [allCourses, id]);
  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-[500px] z-0 bg-gradient-to-b from-cyan-100/70 to-transparent "></div>
        {/* left column */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>
          {/* Rating and Stats Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pt-4">
            {/* Rating Section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-800">
                  {calculateRating(courseData)}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={
                        i < Math.floor(calculateRating(courseData))
                          ? assets.star
                          : assets.star_blank
                      }
                      alt="star"
                      className="w-4 h-4"
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                {courseData.courseRatings.length}{" "}
                {courseData.courseRatings.length === 1 ? "rating" : "ratings"}
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-gray-300"></div>

            {/* Students Count */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {courseData.enrolledStudents.length}{" "}
                {courseData.enrolledStudents.length === 1
                  ? "student enrolled"
                  : "students enrolled"}
              </span>
            </div>
          </div>

          {/* Instructor Section */}
          <div className="flex items-start gap-3 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-sky-50 hover:border-sky-200 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <img
                src={assets.user_icon}
                alt="instructor"
                className="w-6 h-6"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Instructor</p>
              <p className="font-semibold text-gray-800 mb-2">
                Tarun Kumar Jha
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Experienced software engineer and educator with 8+ years in
                full-stack development, specializing in modern web technologies
                and helping students build real-world applications.
              </p>
            </div>
          </div>
        </div>
        {/* right column */}
        <div></div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
