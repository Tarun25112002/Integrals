import React from "react";

const Rating = ({
  userRating,
  setUserRating,
  hoveredRating,
  setHoveredRating,
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            onClick={() => setUserRating(starValue)}
            onMouseEnter={() => setHoveredRating(starValue)}
            onMouseLeave={() => setHoveredRating(0)}
            className="transition-transform hover:scale-110 focus:outline-none"
          >
            <svg
              className={`w-8 h-8 transition-colors ${
                starValue <= (hoveredRating || userRating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              fill={
                starValue <= (hoveredRating || userRating)
                  ? "currentColor"
                  : "none"
              }
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        );
      })}
      {userRating > 0 && (
        <span className="ml-2 text-sm font-semibold text-gray-700">
          {userRating} out of 5
        </span>
      )}
    </div>
  );
};

export default Rating;
