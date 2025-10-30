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

  return (
    isEducator && (
      <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-4 flex flex-col gap-2 bg-white">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
            end={item.path === "/educator"}
          >
            <img src={item.icon} alt={item.name} className="w-6 h-6" />
            <p className="md:block hidden">{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Sidebar;
