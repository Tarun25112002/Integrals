import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/educator/Navbar";
import Footer from "../../components/educator/Footer";
import Sidebar from "../../components/educator/Sidebar";

const Educator = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-default">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex flex-1 relative">
        {/* Overlay for mobile - only show on small screens when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 bottom-0 lg:relative lg:translate-x-0 z-50 w-64 lg:w-auto`}
        >
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Educator;
