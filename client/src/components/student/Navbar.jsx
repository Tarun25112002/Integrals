import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const Navbar = () => {
  const location = useLocation();
  const isCourseListpage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } =
    useContext(AppContext);
  const { user } = useUser();
  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }

      const token = await getToken();

      toast.info("Updating your role to educator...");

      const { data } = await axios.get(
        backendUrl + "/api/educator/update-role",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.message === "Role updated to educator successfully") {
        setIsEducator(true);
        toast.success("You are now an educator!");

        // Reload user to get updated metadata
        await user.reload();

        // Navigate to educator dashboard
        setTimeout(() => {
          navigate("/educator");
        }, 1000);
      } else {
        toast.error(data.message || "Failed to update role");
      }
    } catch (error) {
      console.error("Error becoming educator:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update role"
      );
    }
  };
  return (
    <div
      className={`flex justify-between items-center px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListpage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex gap-5 items-center text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button className="cursor-pointer" onClick={becomeEducator}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>{" "}
              |<Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
          >
            Create Account
          </button>
        )}
      </div>
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button className="cursor-pointer" onClick={becomeEducator}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>{" "}
              |<Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="user" className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
