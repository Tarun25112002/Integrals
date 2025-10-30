import { Outlet } from "react-router-dom";
import Navbar from "../../components/educator/Navbar";
import Footer from "../../components/student/Footer";
import Sidebar from "../../components/educator/Sidebar";

const Educator = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto bg-gradient-to-b from-sky-50/30 to-white">
          <Outlet />
        </div>
      </div>
      
    </div>
  );
};

export default Educator;
