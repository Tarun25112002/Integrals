import { assets } from "../../assets/assets";
import { UserButton, useUser, useClerk } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 border-b border-gray-300 py-3 bg-cyan-100/70 sticky top-0 z-20">
      {/* Mobile Menu Button & Logo */}
      <div className="flex items-center gap-3">
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-200 rounded-md transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="w-24 sm:w-28 lg:w-32 cursor-pointer"
          />
        </Link>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-2 sm:gap-4 text-gray-700">
        {isLoaded ? (
          <>
            {user ? (
              <>
                <p className="hidden md:block font-medium text-sm lg:text-base">
                  {getGreeting()}, {user.firstName || user.fullName}! 👋
                </p>
                <p className="md:hidden font-medium text-sm">
                  Hi, {user.firstName || user.fullName?.split(" ")[0]}!
                </p>
                <UserButton />
              </>
            ) : (
              <button
                onClick={() => openSignIn()}
                className="bg-blue-600 text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Sign In
              </button>
            )}
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
