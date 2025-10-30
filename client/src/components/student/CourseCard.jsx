import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);
  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
    >
      <img
        src={course.courseThumbnail}
        alt="course thumbnail"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {course.courseTitle}
        </h3>
        <p className="text-gray-600 text-sm mb-3">Tarun Kumar Jha</p>

        <div className="flex items-center justify-between mb-3">
          <Rating rating={calculateRating(course)} size="small" />
          <p className="text-sm text-gray-500">
            {course.courseRatings.length}{" "}
            {course.courseRatings.length === 1 ? "rating" : "ratings"}
          </p>
        </div>
        <p className="text-lg font-bold text-blue-600">
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
