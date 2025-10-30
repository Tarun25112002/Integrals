import { useContext } from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
    {
      name: "My Courses",
      path: "/educator/my-courses",
      icon: assets.my_course_icon,
    },
    {
      name: "Students Enrolled",
      path: "/educator/students-enrolled",
      icon: assets.person_tick_icon,
    },
  ];

  if (!isEducator) return null;

  return (
    <div className="md:w-64 w-16 border-r border-blue-200 py-6 flex flex-col gap-2 bg-blue-50/50 h-full overflow-y-auto">
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-blue-600/90 text-white font-semibold shadow-md"
                : "text-gray-700 hover:bg-blue-100/70 hover:text-blue-700"
            }`
          }
          end={item.path === "/educator"}
        >
          {({ isActive }) => (
            <>
              <img
                src={item.icon}
                alt={item.name}
                className="w-6 h-6"
                style={{
                  filter: isActive ? "brightness(0) invert(1)" : "none",
                }}
              />
              <p className="md:block hidden text-sm">{item.name}</p>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
