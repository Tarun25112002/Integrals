import { useContext, useMemo, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/student/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { dummyEducatorData } from "../../assets/assets";


function MyEnrollments() {
  const {
    
    enrolledCourses,
    calculateCourseDuration,
    calculateNoOfLectures,
    userData,
    fetchUserEnrolledCourses,
    backendUrl,
    getToken,
    setProgressArray

     
  } = useContext(AppContext);

  const navigate = useNavigate();
  const [filter, setFilter] = useState("all"); // all, in-progress, completed

  // Move useEffect inside the component
  useEffect(() => {
    if (userData && fetchUserEnrolledCourses) {
      fetchUserEnrolledCourses();
    }
  }, [userData, fetchUserEnrolledCourses]);

  const progressArray = [
  
  ];

  const coursesWithProgress = useMemo(() => {
    return enrolledCourses.map((course, index) => {
      const progressData = progressArray[index] || {
        lectureCompleted: 0,
        totalLectures: 1,
      };
      const { lectureCompleted, totalLectures } = progressData;
      const progress =
        totalLectures === 0
          ? 0
          : Math.floor((lectureCompleted / totalLectures) * 100);
const getCourseProgress = async () => {
  try {
    const token = await getToken();
    const tempProgressArray = await Promise.all(
      enrolledCourses.map(async (course, index) => {
        const { data } = await axios.get(
          backendUrl + "/api/user/get-course-progress",{courseId: course._id},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
           
          }
        );
         let totalLectures = calculateNoOfLectures(course);
         const lectureCompleted = data.progressData
           ? data.progressData.lectureCompleted.length
           : 0;
         return { totalLectures, lectureCompleted };
       
      })
    )
   setProgressArray(tempProgressArray);
  } catch (error) {
    toast.error(error.message);
  }
}
      return {
        ...course,
        progress,
        lectureCompleted,
        totalLectures,
        originalIndex: index,
      };
    });
  }, [enrolledCourses]);

  const totalCourses = coursesWithProgress.length;
  const completedCourses = coursesWithProgress.filter(
    (c) => c.progress === 100
  ).length;
  const inProgressCourses = coursesWithProgress.filter(
    (c) => c.progress > 0 && c.progress < 100
  ).length;

  const filteredCourses = useMemo(() => {
    if (filter === "completed") {
      return coursesWithProgress.filter((course) => course.progress === 100);
    }
    if (filter === "in-progress") {
      return coursesWithProgress.filter(
        (course) => course.progress > 0 && course.progress < 100
      );
    }
    return coursesWithProgress;
  }, [coursesWithProgress, filter]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-cyan-50/30 to-white">
        <div className="md:px-36 px-8 pt-20 pb-20">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              My Learning Dashboard
            </h1>
            <p className="text-gray-600">
              Track your progress and continue your learning journey
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:bg-sky-50/70 hover:backdrop-blur-sm hover:border-sky-200 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Courses</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {totalCourses}
                  </p>
                </div>
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:bg-sky-50/70 hover:backdrop-blur-sm hover:border-sky-200 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {inProgressCourses}
                  </p>
                </div>
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:bg-sky-50/70 hover:backdrop-blur-sm hover:border-sky-200 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className=" text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {completedCourses}
                  </p>
                </div>
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-2 inline-flex gap-2 ">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                filter === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setFilter("in-progress")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                filter === "in-progress"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                filter === "completed"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Completed
            </button>
          </div>

          {/* Courses Table/Cards */}
          {filteredCourses.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCourses.map((course) => {
                      const progress = course.progress;
                      const isCompleted = progress === 100;
                      const educatorName =
                        typeof course.educator === "object" &&
                        course.educator?.name
                          ? course.educator.name
                          : dummyEducatorData?.name || "Instructor";

                      return (
                        <tr
                          key={course._id}
                          className="hover:bg-sky-50/70 hover:backdrop-blur-sm transition-all duration-300"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={course.courseThumbnail}
                                alt={course.courseTitle}
                                className="w-20 h-14 object-cover rounded-lg shadow-sm"
                              />
                              <div>
                                <p className="font-semibold text-gray-800 mb-1">
                                  {course.courseTitle}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {educatorName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4 text-gray-600">
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="text-sm font-medium">
                                  {calculateCourseDuration(course)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2"></div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-gray-200 rounded-full h-2.5 max-w-[120px]">
                                  <div
                                    className={`h-2.5 rounded-full transition-all duration-300 ${
                                      isCompleted
                                        ? "bg-green-600"
                                        : "bg-blue-600"
                                    }`}
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-semibold text-gray-700 min-w-[45px]">
                                  {progress}%
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">
                                {course.lectureCompleted} /{" "}
                                {course.totalLectures} lectures
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={` inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                isCompleted
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : "bg-blue-100 text-blue-700 border border-blue-200"
                              }`}
                            >
                              {isCompleted ? "Completed" : "In Progress"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => navigate(`/player/${course._id}`)}
                              className=" cursor-pointer text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline flex items-center gap-1"
                            >
                              {isCompleted ? "Review" : "Continue"}
                              <svg
                                className="w-4 h-4"
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
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {filteredCourses.map((course) => {
                  const progress = course.progress;
                  const isCompleted = progress === 100;
                  const educatorName =
                    typeof course.educator === "object" && course.educator?.name
                      ? course.educator.name
                      : dummyEducatorData?.name || "Instructor";

                  return (
                    <div
                      key={course._id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:bg-sky-50/70 hover:backdrop-blur-sm hover:shadow-md hover:border-sky-200 transition-all duration-300"
                    >
                      <div className="flex gap-3 mb-4">
                        <img
                          src={course.courseThumbnail}
                          alt={course.courseTitle}
                          className="w-24 h-16 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {course.courseTitle}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {educatorName}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium text-gray-800">
                            {calculateCourseDuration(course)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Lectures:</span>
                          <span className="font-medium text-gray-800">
                            {calculateNoOfLectures(course)}
                          </span>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress:</span>
                            <span className="font-semibold text-gray-800">
                              {course.lectureCompleted} / {course.totalLectures}{" "}
                              lectures ({progress}%)
                            </span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full transition-all duration-300 ${
                                isCompleted ? "bg-green-600" : "bg-blue-600"
                              }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              isCompleted
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-blue-100 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {isCompleted ? "Completed" : "In Progress"}
                          </span>
                          <button
                            onClick={() => navigate(`/player/${course._id}`)}
                            className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
                          >
                            {isCompleted ? "Review" : "Continue"}
                            <svg
                              className="w-4 h-4"
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
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {filter === "all"
                  ? "No Enrollments Yet"
                  : `No ${
                      filter === "completed" ? "Completed" : "In Progress"
                    } Courses`}
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === "all"
                  ? "Start your learning journey by enrolling in a course"
                  : `You don't have any ${
                      filter === "completed" ? "completed" : "in progress"
                    } courses yet`}
              </p>
              <button
                onClick={() => navigate("/course-list")}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyEnrollments;
