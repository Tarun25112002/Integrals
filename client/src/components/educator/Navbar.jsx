import { assets } from "../../assets/assets";
import { UserButton, useUser, useClerk } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 bg-cyan-100/70">
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className="w-28 lg:w-32 cursor-pointer"
        />
      </Link>
      <div className="flex items-center gap-5 text-gray-700 relative">
        {isLoaded ? (
          <>
            {user ? (
              <>
                <p className="font-medium">
                  {getGreeting()}, {user.firstName || user.fullName}! 👋
                </p>
                <UserButton />
              </>
            ) : (
              <button
                onClick={() => openSignIn()}
                className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors font-medium"
              >
                Sign In
              </button>
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
