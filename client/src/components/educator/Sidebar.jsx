import { useContext, useMemo, memo } from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Sidebar = ({ isOpen }) => {
  const { isEducator } = useContext(AppContext);

  const menuItems = useMemo(
    () => [
      {
        name: "Dashboard",
        path: "/educator",
        icon: assets.home_icon,
        ariaLabel: "Navigate to Dashboard",
      },
      {
        name: "Add Course",
        path: "/educator/add-course",
        icon: assets.add_icon,
        ariaLabel: "Navigate to Add Course",
      },
      {
        name: "My Courses",
        path: "/educator/my-courses",
        icon: assets.my_course_icon,
        ariaLabel: "Navigate to My Courses",
      },
      {
        name: "Students Enrolled",
        path: "/educator/student-enrolled",
        icon: assets.person_tick_icon,
        ariaLabel: "Navigate to Students Enrolled",
      },
    ],
    []
  );

  if (!isEducator) return null;

  return (
    <nav
      className={`${isOpen ? "w-64" : "w-16"} md:w-64 border-r border-blue-200 py-6 flex flex-col gap-3 bg-blue-50 h-full overflow-y-auto`}
      aria-label="Educator navigation menu"
      role="navigation"
    >
      <ul className="flex flex-col gap-2" role="menu">
        {menuItems.map((item) => (
          <li key={item.path} role="none">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isActive
                    ? "bg-blue-600/90 text-white font-semibold shadow-md"
                    : "text-gray-700 hover:bg-blue-100/70 hover:text-blue-700"
                }`
              }
              end={item.path === "/educator"}
              aria-label={item.ariaLabel}
              role="menuitem"
            >
              {({ isActive }) => (
                <>
                  <img
                    src={item.icon}
                    alt=""
                    className="w-6 h-6 flex-shrink-0"
                    style={{
                      filter: isActive ? "brightness(0) invert(1)" : "none",
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className={`text-sm truncate ${isOpen ? "block" : "hidden md:block"}`}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto px-4 py-3 mx-2">
        <div className={`text-xs text-gray-500 space-y-1 ${isOpen ? "block" : "hidden md:block"}`}>
          <p className="font-semibold text-gray-700">Educator Portal</p>
          <p>Manage your courses and students</p>
        </div>
      </div>
    </nav>
  );
};

export default memo(Sidebar);
