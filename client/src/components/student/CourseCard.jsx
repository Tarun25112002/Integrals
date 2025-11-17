import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  if (!course) return null;

  const thumbnail =
    course.courseThumbnail ||
    "https://via.placeholder.com/400x300?text=No+Image";
  const ratings = course.courseRatings || [];
  const discount = course.discount || 0;
  const price = course.coursePrice || 0;
  const finalPrice = (price - (discount * price) / 100).toFixed(2);
  const educatorName = course.educator?.name || "Unknown Educator";

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
    >
      <img
        src={thumbnail}
        alt="course thumbnail"
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x300?text=Image+Error";
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {course.courseTitle}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{educatorName}</p>

        <div className="flex items-center justify-between mb-3">
          <Rating rating={calculateRating(course)} size="small" />
          <p className="text-sm text-gray-500">
            {ratings.length} {ratings.length === 1 ? "rating" : "ratings"}
          </p>
        </div>
        <p className="text-lg font-bold text-blue-600">
          {currency}
          {finalPrice}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
