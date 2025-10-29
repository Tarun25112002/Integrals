const Spinner = ({ size = "md", color = "blue" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };

  const colorClasses = {
    blue: "border-t-blue-600",
    white: "border-t-white",
    gray: "border-t-gray-600",
    green: "border-t-green-600",
    red: "border-t-red-600",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-gray-200 ${colorClasses[color]} rounded-full animate-spin`}
    ></div>
  );
};

export default Spinner;
