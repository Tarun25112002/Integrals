import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import { use } from "react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
const [enrolledCourses, setEnrolledCourses] = useState([]);
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };
const{getToken} = useAuth()
const {user} = useUser()
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m", "s"] });
  };
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m", "s"] });
  };

  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    if (!course || !Array.isArray(course.courseContent)) return totalLectures;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  //Fetch all courses
  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  }

  useEffect(() => {
    fetchUserEnrolledCourses();
    fetchAllCourses();
  }, []);
  const logToken = async () => {
    console.log(await getToken());
  }
useEffect(() => {
  if(user){
    logToken()
  }
},[])

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
