import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState(new Set());
  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
  } = useContext(AppContext);
  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  const toggleChapter = (chapterIndex) => {
    const newExpandedChapters = new Set(expandedChapters);
    if (newExpandedChapters.has(chapterIndex)) {
      newExpandedChapters.delete(chapterIndex);
    } else {
      newExpandedChapters.add(chapterIndex);
    }
    setExpandedChapters(newExpandedChapters);
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
          <div className="pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Course Structure
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{calculateNoOfLectures(courseData)} lectures</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{calculateCourseDuration(courseData)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <div className="p-4 hover:bg-sky-50 hover:border-sky-200 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-700">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base">
                            {chapter.chapterTitle}
                          </h3>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>
                                {Array.isArray(chapter.chapterContent)
                                  ? chapter.chapterContent.length
                                  : 0}{" "}
                                lectures
                              </span>
                            </div>

                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{calculateChapterTime(chapter)}</span>
                            </div>
                          </div>

                          {/* Lectures List - Conditionally Rendered */}
                          {expandedChapters.has(index) && (
                            <div className="mt-3 ml-11">
                              <div className="space-y-2">
                                {chapter.chapterContent.map((lecture, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-sky-50 transition-all duration-300 cursor-pointer"
                                  >
                                    <div className="flex-shrink-0">
                                      <img
                                        src={assets.play_icon}
                                        alt="play icon"
                                        className="w-4 h-4 text-gray-500"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {lecture.lectureTitle}
                                      </p>
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-500">
                                          {humanizeDuration(
                                            lecture.lectureDuration * 60 * 1000,
                                            { units: ["h", "m", "s"] }
                                          )}
                                        </span>
                                        {lecture.isPreviewFree && (
                                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                            Preview
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => toggleChapter(index)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-all duration-200"
                      >
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${
                            expandedChapters.has(index)
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
