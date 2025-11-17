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
import Navbar from "./components/student/Navbar";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const isEducatorRoute = useMatch("/educator/*");
  const appRef = useRef(null);
  const smoothWrapperRef = useRef(null);
  const smoothContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        appRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.1
        }
      );

      ScrollSmoother.create({
        wrapper: smoothWrapperRef.current,
        content: smoothContentRef.current,
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={smoothWrapperRef} id="smooth-wrapper" style={{ overflow: 'hidden' }}>
      <div ref={smoothContentRef} id="smooth-content">
        <div ref={appRef} className="text-default min-h-screen bg-white text-gray-900">
         <ToastContainer />
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
              <Route path="/educator" element={<Dashboard />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="student-enrolled" element={<StudentsEnrolled />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
