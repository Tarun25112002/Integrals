import { assets } from "../../assets/assets";

const Rating = ({ rating, showNumber = true, size = "small" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-2">
      {showNumber && (
        <span
          className={`font-semibold text-gray-800 ${
            size === "large" ? "text-lg" : "text-sm"
          }`}
        >
          {rating}
        </span>
      )}
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src={i < Math.floor(rating) ? assets.star : assets.star_blank}
            alt="star"
            className={sizeClasses[size]}
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;
