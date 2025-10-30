import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import Youtube from "react-youtube";
import DOMPurify from "dompurify";
import Footer from "../../components/student/Footer";
const Player = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playerData, setPlayerData] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState(new Set([0]));
  const [completedLectures, setCompletedLectures] = useState(new Set());

  // Rating and feedback states
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);

  // Calculate progress
  const totalLectures =
    courseData?.courseContent?.reduce(
      (total, chapter) => total + (chapter.chapterContent?.length || 0),
      0
    ) || 0;
  const progress =
    totalLectures > 0
      ? Math.round((completedLectures.size / totalLectures) * 100)
      : 0;

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`course-${courseId}-progress`);
    if (saved) {
      try {
        const { completed, rating, liked, disliked, comments } =
          JSON.parse(saved);
        setCompletedLectures(new Set(completed || []));
        setUserRating(rating || 0);
        setLiked(liked || false);
        setDisliked(disliked || false);
        setComments(comments || []);
      } catch (error) {
        console.error("Error loading saved progress:", error);
      }
    }
  }, [courseId]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      `course-${courseId}-progress`,
      JSON.stringify({
        completed: Array.from(completedLectures),
        rating: userRating,
        liked,
        disliked,
        comments,
      })
    );
  }, [completedLectures, userRating, liked, disliked, comments, courseId]);

  // Fixed useEffect with getCourseData moved inside
  useEffect(() => {
    if (enrolledCourses && enrolledCourses.length > 0) {
      const getCourseData = () => {
        const foundCourse = enrolledCourses.find(
          (course) => course._id === courseId
        );
        if (foundCourse) {
          setCourseData(foundCourse);
          if (foundCourse.courseContent?.[0]?.chapterContent?.[0]?.lectureUrl) {
            setPlayerData({
              videoId: foundCourse.courseContent[0].chapterContent[0].lectureUrl
                .split("/")
                .pop(),
            });
          }
        }
        setIsLoading(false);
      };
      getCourseData();
    }
  }, [enrolledCourses, courseId]);

  const toggleChapter = (chapterIndex) => {
    const newExpandedChapters = new Set(expandedChapters);
    if (newExpandedChapters.has(chapterIndex)) {
      newExpandedChapters.delete(chapterIndex);
    } else {
      newExpandedChapters.add(chapterIndex);
    }
    setExpandedChapters(newExpandedChapters);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Course not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-sky-50/60 to-white pt-16">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col xl:flex-row gap-6 p-4 xl:p-6">
            {/* Left Section - Video Player & Details */}
            <div className="flex-1 xl:flex-[2]">
              {/* Video Player */}
              <div className="bg-black rounded-xl overflow-hidden shadow-lg mb-4">
                <div className="aspect-video">
                  {playerData ? (
                    <Youtube
                      videoId={playerData.videoId}
                      opts={{
                        height: "100%",
                        width: "100%",
                        playerVars: {
                          autoplay: 0,
                          modestbranding: 1,
                          rel: 0,
                        },
                      }}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <svg
                          className="w-16 h-16 mx-auto mb-4 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <p className="text-gray-400">
                          Select a lecture to start
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Course Details Card */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                {/* Course Header */}
                <div className="p-6 border-b border-blue-100 bg-gradient-to-br from-blue-50/50 to-white">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {courseData.courseTitle}
                  </h1>

                  {/* Course Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-3 border border-blue-100 hover:bg-sky-50/50 transition-colors duration-200">
                      <div className="flex items-center gap-2 mb-1">
                        <svg
                          className="w-4 h-4 text-blue-600"
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
                        <span className="text-xs font-medium text-gray-500">
                          Total Lectures
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {courseData.courseContent?.reduce(
                          (total, chapter) =>
                            total + (chapter.chapterContent?.length || 0),
                          0
                        )}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-blue-100 hover:bg-sky-50/50 transition-colors duration-200">
                      <div className="flex items-center gap-2 mb-1">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                          />
                        </svg>
                        <span className="text-xs font-medium text-gray-500">
                          Chapters
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {courseData.courseContent?.length || 0}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-blue-100 hover:bg-sky-50/50 transition-colors duration-200">
                      <div className="flex items-center gap-2 mb-1">
                        <svg
                          className="w-4 h-4 text-blue-600"
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
                        <span className="text-xs font-medium text-gray-500">
                          Completed
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {completedLectures.size}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-blue-100 hover:bg-sky-50/50 transition-colors duration-200">
                      <div className="flex items-center gap-2 mb-1">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        <span className="text-xs font-medium text-gray-500">
                          Progress
                        </span>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {progress}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Description */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-base font-bold text-gray-800">
                      About this course
                    </h3>
                  </div>
                  <div
                    className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        courseData.courseDescription
                          .replace(
                            /<h2>/g,
                            '<h2 class="text-xl font-bold text-gray-900 mt-4 mb-3">'
                          )
                          .replace(
                            /<h3>/g,
                            '<h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2">'
                          )
                          .replace(
                            /<p>/g,
                            '<p class="text-gray-600 mb-3 leading-relaxed">'
                          )
                          .replace(/<ul>/g, '<ul class="space-y-2 my-3 ml-4">')
                          .replace(
                            /<li>/g,
                            '<li class="flex items-start gap-2 text-gray-600"><svg class="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg><span>'
                          )
                          .replace(/<\/li>/g, "</span></li>")
                          .replace(
                            /<strong>/g,
                            '<strong class="font-semibold text-gray-800">'
                          )
                      ),
                    }}
                  />
                </div>

                {/* Instructor Info (if available) */}
                {courseData.educator && (
                  <div className="px-6 pb-6">
                    <div className="bg-gradient-to-br from-blue-50/50 to-sky-50/30 rounded-lg p-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <h4 className="text-sm font-bold text-gray-800">
                          Instructor
                        </h4>
                      </div>
                      <p className="text-gray-700 font-medium">
                        {typeof courseData.educator === "object"
                          ? courseData.educator.name
                          : courseData.educator}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Rating and Feedback Section */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden mt-4">
                {/* Rating Header */}
                <div className="bg-gradient-to-br from-blue-50/50 to-white p-6 border-b border-blue-100">
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-800">
                      Rate this Course
                    </h3>
                  </div>

                  {/* Star Rating - FIXED */}
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <svg
                          className={`w-8 h-8 transition-colors ${
                            star <= (hoveredRating || userRating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill={
                            star <= (hoveredRating || userRating)
                              ? "currentColor"
                              : "none"
                          }
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </button>
                    ))}
                    {userRating > 0 && (
                      <span className="ml-2 text-sm font-semibold text-gray-700">
                        {userRating} out of 5
                      </span>
                    )}
                  </div>

                  {/* Like/Dislike Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setLiked(!liked);
                        if (disliked) setDisliked(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        liked
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "border-gray-300 text-gray-600 hover:bg-sky-50/50 hover:border-blue-300"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill={liked ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      <span className="font-medium">Like</span>
                    </button>

                    <button
                      onClick={() => {
                        setDisliked(!disliked);
                        if (liked) setLiked(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        disliked
                          ? "bg-red-50 border-red-500 text-red-700"
                          : "border-gray-300 text-gray-600 hover:bg-red-50/50 hover:border-red-300"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill={disliked ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                        />
                      </svg>
                      <span className="font-medium">Dislike</span>
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold text-gray-800">
                      Comments ({comments.length})
                    </h4>
                    <button
                      onClick={() => setShowCommentBox(!showCommentBox)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add Comment
                    </button>
                  </div>

                  {/* Comment Input Box */}
                  {showCommentBox && (
                    <div className="mb-6 bg-sky-50/30 rounded-lg p-4 border border-blue-100">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts about this course..."
                        className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows="4"
                      />
                      <div className="flex justify-end gap-2 mt-3">
                        <button
                          onClick={() => {
                            setShowCommentBox(false);
                            setComment("");
                          }}
                          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            if (comment.trim()) {
                              setComments([
                                {
                                  id: Date.now(),
                                  text: comment,
                                  author: "You",
                                  date: new Date().toLocaleDateString(),
                                  likes: 0,
                                },
                                ...comments,
                              ]);
                              setComment("");
                              setShowCommentBox(false);
                            }
                          }}
                          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <svg
                          className="w-12 h-12 mx-auto mb-3 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <p className="text-sm">
                          No comments yet. Be the first to share your thoughts!
                        </p>
                      </div>
                    ) : (
                      comments.map((commentItem) => (
                        <div
                          key={commentItem.id}
                          className="bg-white border border-blue-100 rounded-lg p-4 hover:bg-sky-50/30 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-blue-700">
                                  {commentItem.author.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">
                                  {commentItem.author}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {commentItem.date}
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm mb-3">
                            {commentItem.text}
                          </p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
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
                                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                />
                              </svg>
                              <span>{commentItem.likes}</span>
                            </button>
                            <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Course Content Sidebar */}
            <div className="xl:flex-[1] xl:max-w-[420px]">
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden sticky top-20">
                {/* Header with Progress */}
                <div className="bg-gradient-to-br from-blue-50 to-sky-50/50 border-b border-blue-100 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                      </svg>
                      Course Content
                    </h2>
                    <span className="text-sm font-bold text-blue-700">
                      {progress}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="w-full bg-blue-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-blue-600/80 text-sm">
                    {completedLectures.size} of {totalLectures} lectures
                    completed • {courseData.courseContent?.length || 0} chapters
                  </p>
                </div>

                {/* Scrollable Content */}
                <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
                  <div className="divide-y divide-blue-100">
                    {courseData.courseContent?.map((chapter, index) => (
                      <div key={index} className="bg-white">
                        {/* Chapter Header */}
                        <button
                          onClick={() => toggleChapter(index)}
                          className="w-full flex items-center gap-3 p-4 hover:bg-sky-50/70 hover:backdrop-blur-sm transition-all duration-200 group"
                        >
                          {/* Chapter Number Badge */}
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors duration-200">
                            <span className="text-sm font-bold text-blue-700">
                              {index + 1}
                            </span>
                          </div>

                          <div className="flex-1 text-left">
                            <h3 className="font-semibold text-gray-800 text-sm group-hover:text-blue-700 transition-colors">
                              {chapter.chapterTitle}
                            </h3>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                </svg>
                                {chapter.chapterContent?.length || 0} lectures
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <svg
                                  className="w-3 h-3"
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
                                {calculateChapterTime(chapter)}
                              </span>
                            </div>
                          </div>

                          <svg
                            className={`flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-all duration-200 ${
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

                        {/* Lectures List */}
                        {expandedChapters.has(index) && (
                          <div className="bg-sky-50/30">
                            {chapter.chapterContent?.map((lecture, i) => {
                              const lectureId = `${index}-${i}`;
                              const isCompleted =
                                completedLectures.has(lectureId);
                              const isActive =
                                playerData?.videoId ===
                                lecture.lectureUrl.split("/").pop();

                              return (
                                <div
                                  key={i}
                                  onClick={() => {
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    });
                                  }}
                                  className={`group flex items-start gap-3 p-3 pl-6 cursor-pointer transition-all duration-200 border-l-4 ${
                                    isActive
                                      ? "bg-sky-50/70 backdrop-blur-sm border-blue-500"
                                      : "border-transparent hover:bg-white hover:border-blue-200"
                                  }`}
                                >
                                  {/* Lecture Status Icon */}
                                  <div className="flex-shrink-0 mt-0.5">
                                    {isCompleted ? (
                                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <svg
                                          className="w-3.5 h-3.5 text-white"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      </div>
                                    ) : isActive ? (
                                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                        <svg
                                          className="w-3 h-3 text-white"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M8 5v14l11-7z" />
                                        </svg>
                                      </div>
                                    ) : (
                                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center group-hover:border-blue-400 transition-colors">
                                        <svg
                                          className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M8 5v14l11-7z" />
                                        </svg>
                                      </div>
                                    )}
                                  </div>

                                  {/* Lecture Info */}
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`text-sm font-medium mb-1 ${
                                        isActive
                                          ? "text-blue-700"
                                          : isCompleted
                                          ? "text-gray-700"
                                          : "text-gray-800"
                                      }`}
                                    >
                                      {lecture.lectureTitle}
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <svg
                                          className="w-3 h-3"
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
                                        {humanizeDuration(
                                          lecture.lectureDuration * 60 * 1000,
                                          {
                                            units: ["h", "m", "s"],
                                            round: true,
                                          }
                                        )}
                                      </span>
                                      {lecture.isPreviewFree && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                          Free Preview
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Mark Complete Checkbox */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setCompletedLectures((prev) => {
                                        const newSet = new Set(prev);
                                        if (newSet.has(lectureId)) {
                                          newSet.delete(lectureId);
                                        } else {
                                          newSet.add(lectureId);
                                        }
                                        return newSet;
                                      });
                                    }}
                                    className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <div
                                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                        isCompleted
                                          ? "bg-green-500 border-green-500"
                                          : "border-gray-300 hover:border-blue-400"
                                      }`}
                                    >
                                      {isCompleted && (
                                        <svg
                                          className="w-3 h-3 text-white"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Player;
