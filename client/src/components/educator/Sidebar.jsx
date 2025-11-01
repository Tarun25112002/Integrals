import { useContext, useMemo, memo } from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Sidebar = ({ isOpen = true, onClose }) => {
  const { isEducator } = useContext(AppContext);

  // Memoize menu items to prevent recreation on every render
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
        path: "/educator/students-enrolled",
        icon: assets.person_tick_icon,
        ariaLabel: "Navigate to Students Enrolled",
      },
    ],
    []
  );

  if (!isEducator) return null;

  return (
    <>
      {/* Sidebar Navigation */}
      <nav
        className={`md:w-64 w-16 border-r border-blue-200 py-6 flex flex-col gap-3 bg-blue-50/50 h-full overflow-y-auto min-h-screen transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        aria-label="Educator navigation menu"
        role="navigation"
      >
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-blue-100 text-gray-700"
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Menu Items */}
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
                onClick={() => onClose && window.innerWidth < 768 && onClose()}
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
                    <span className="md:block hidden text-sm truncate">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Additional Info Section (Optional) */}
        <div className="mt-auto px-4 py-3 mx-2">
          <div className="hidden md:block text-xs text-gray-500 space-y-1">
            <p className="font-semibold text-gray-700">Educator Portal</p>
            <p>Manage your courses and students</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(Sidebar);
