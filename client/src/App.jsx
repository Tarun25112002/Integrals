import { Routes, Route, useMatch } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import EditCourse from "./pages/educator/EditCourse";
import Navbar from "./components/student/Navbar";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const isEducatorRoute = useMatch("/educator/*");
  const appRef = useRef(null);
  const smoothWrapperRef = useRef(null);
  const smoothContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial fade-in animation
      gsap.fromTo(
        appRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.1,
        }
      );

      // Only create ScrollSmoother if refs are available
      if (smoothWrapperRef.current && smoothContentRef.current) {
        try {
          ScrollSmoother.create({
            wrapper: smoothWrapperRef.current,
            content: smoothContentRef.current,
            smooth: 1.5,
            effects: true,
            smoothTouch: 0.1,
          });
        } catch (error) {
          console.warn("ScrollSmoother initialization failed:", error);
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={smoothWrapperRef}
      id="smooth-wrapper"
      style={{ overflow: "hidden" }}
    >
      <div ref={smoothContentRef} id="smooth-content">
        <div
          ref={appRef}
          className="text-default min-h-screen bg-white text-gray-900"
        >
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {!isEducatorRoute && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course-list" element={<CoursesList />} />
            <Route path="/course-list/:input" element={<CoursesList />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/my-enrollments" element={<MyEnrollments />} />
            <Route path="/player/:courseId" element={<Player />} />
            <Route path="/loading/:path" element={<Loading />} />
            <Route path="/educator" element={<Educator />}>
              <Route index element={<Dashboard />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="edit-course/:id" element={<EditCourse />} />
              <Route path="student-enrolled" element={<StudentsEnrolled />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
