import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import Youtube from "react-youtube";
import Rating from "../../components/student/Rating";
import { toast } from "react-toastify";
import axios from "axios";

function CourseDetails() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState(new Set());
  const {
    
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    currency,
    backendUrl,
    userData,
    getToken
  } = useContext(AppContext);
  const fetchCourseData = async () => {
   try {
    const { data } = await axios.get(backendUrl + `/api/course/` + id);
    if(data.success){
      setCourseData(data.courseData);
    }
    else{
      toast.error(data.message)
    }

   } catch (error) {
    toast.error(error.message)
   }
  };

  const enrollCourse = async () => {
    try {
      if (!userData) {
        return toast.warn("Please login to enroll the course");
      }
      if (isAlreadyEnrolled) {
        return toast.warn("You are already enrolled in this course");
      }

      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/purchase",
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        const redirectUrl = data.url || data.session_url;
        if (redirectUrl) {
          window.location.replace(redirectUrl);
        } else {
          toast.error("Checkout URL missing");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
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
    
      fetchCourseData();
    
  }, []);
  useEffect(() => {
   if(userData && courseData){
     setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
   }
  }, [userData, courseData]);
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
              <Rating rating={calculateRating(courseData)} size="small" />
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                {(Array.isArray(courseData.courseRatings) ? courseData.courseRatings.length : 0)}{" "}
                {(Array.isArray(courseData.courseRatings) && courseData.courseRatings.length === 1) ? "rating" : "ratings"}
              </span>
            </div>
            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {(Array.isArray(courseData.enrolledStudents) ? courseData.enrolledStudents.length : 0)}{" "}
                {(Array.isArray(courseData.enrolledStudents) && courseData.enrolledStudents.length === 1)
                  ? "student enrolled"
                  : "students enrolled"}
              </span>
            </div>
          </div>

          {/* Instructor Section */}
          <div className="flex items-start gap-3 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-sky-50 hover:border-sky-200 transition-all duration-300">
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
                {courseData.educator?.name ?? courseData.educator?.fullName ?? "Unknown Educator"}
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
                  <div className="p-4 hover:bg-sky-50 hover:border-sky-200 transition-all duration-300 ">
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
                                          <span
                                            onClick={() =>
                                              setPlayerData({
                                                videoId: lecture.lectureUrl
                                                  .split("/")
                                                  .pop(),
                                              })
                                            }
                                            className=" text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium"
                                          >
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
                          className={`w-5 h-5 transition-transform duration-200 cursor-pointer ${
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
          <div className="py-20 text-sm md:text-default">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <div
              className="mt-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4 md:p-5 text-gray-700 leading-relaxed space-y-3 hover:bg-sky-50 hover:border-sky-200 transition-all duration-300  [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1 [&_strong]:text-gray-900"
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            />
          </div>
        </div>
        {/* right column */}
        <div className="w-full md:w-auto md:max-w-md md:sticky md:top-24">
          {/* Course Video/Thumbnail */}
          <div className="relative mb-6 group">
            {playerData ? (
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Youtube
                  videoId={playerData.videoId}
                  opts={{
                    playerVars: {
                      autoplay: 1,
                      modestbranding: 1,
                      rel: 0,
                    },
                  }}
                  iframeClassName="w-full aspect-video"
                />
                <button
                  onClick={() => setPlayerData(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 cursor-pointer"
                  aria-label="Close video"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={courseData.courseThumbnail}
                  alt="course thumbnail"
                  className="w-full h-48 md:h-64 object-cover"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>

                {/* Play button overlay - only show if there's a preview available */}
                {courseData.courseContent.some((chapter) =>
                  chapter.chapterContent.some(
                    (lecture) => lecture.isPreviewFree
                  )
                ) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => {
                        const previewLecture = (Array.isArray(courseData.courseContent) ? courseData.courseContent : [])
                          .flatMap((chapter) => (Array.isArray(chapter.chapterContent) ? chapter.chapterContent : []))
                          .find((lecture) => lecture.isPreviewFree);
                        if (previewLecture) {
                          setPlayerData({
                            videoId: previewLecture.lectureUrl.split("/").pop(),
                          });
                        }
                      }}
                      className="bg-white/90 hover:bg-white text-blue-600 p-6 rounded-full shadow-2xl transform group-hover:scale-110 transition-all duration-300 cursor-pointer"
                      aria-label="Play preview"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Preview badge */}
                {courseData.courseContent.some((chapter) =>
                  chapter.chapterContent.some(
                    (lecture) => lecture.isPreviewFree
                  )
                ) && (
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-lg flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Preview Available
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pricing Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:bg-sky-50 hover:border-sky-200 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  $
                  {(
                    courseData.coursePrice -
                    (courseData.discount * courseData.coursePrice) / 100
                  ).toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${courseData.coursePrice}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                One-time payment • Lifetime access
              </p>
            </div>

            {/* Limited Time Offer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={assets.time_left_clock_icon}
                  alt="time left clock icon"
                  className="w-5 h-5"
                />
                <span className="text-sm font-semibold text-red-700">
                  Limited Time Offer
                </span>
              </div>
              <p className="text-sm text-red-600">
                <span className="font-medium">5 days</span> left at this price
              </p>
            </div>

            {/* Course Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">
                  {calculateNoOfLectures(courseData)} video lectures
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">
                  {calculateCourseDuration(courseData)} total duration
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Lifetime access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">
                  Certificate of completion
                </span>
              </div>
            </div>

            {/* Enroll Button */}
            <button onClick={enrollCourse} className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            {/* Money Back Guarantee */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
