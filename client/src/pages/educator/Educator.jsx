import { Outlet } from "react-router-dom";
import Navbar from "../../components/educator/Navbar";
import Footer from "../../components/student/Footer";
import Sidebar from "../../components/educator/Sidebar";
import { assets } from "../../assets/assets";
const Educator = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{<Outlet />}</div>
      </div>
    </div>
  );
};

export default Educator;
