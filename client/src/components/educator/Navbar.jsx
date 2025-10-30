import { assets } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, isLoaded } = useUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 bg-cyan-100/70">
      <Link to="/educator">
        <img
          src={assets.logo}
          alt="logo"
          className="w-28 lg:w-32 cursor-pointer"
        />
      </Link>
      <div className="flex items-center gap-5 text-gray-700 relative">
        {isLoaded ? (
          <>
            <p className="font-medium">
              {getGreeting()},{" "}
              {user ? user.firstName || user.fullName : "Educator"}! 👋
            </p>
            {user ? (
              <UserButton />
            ) : (
              <img className="max-w-8" src={assets.profile_img} alt="profile" />
            )}
          </>
        ) : (
          <div className="flex items-center gap-5">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
