import { Routes, Route, useMatch } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/student/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load all page components for code splitting
const Home = lazy(() => import("./pages/student/Home"));
const CoursesList = lazy(() => import("./pages/student/CoursesList"));
const CourseDetails = lazy(() => import("./pages/student/CourseDetails"));
const MyEnrollments = lazy(() => import("./pages/student/MyEnrollments"));
const Player = lazy(() => import("./pages/student/Player"));
const Loading = lazy(() => import("./components/student/Loading"));
const Educator = lazy(() => import("./pages/educator/Educator"));
const Dashboard = lazy(() => import("./pages/educator/Dashboard"));
const AddCourse = lazy(() => import("./pages/educator/AddCourse"));
const MyCourses = lazy(() => import("./pages/educator/MyCourses"));
const StudentsEnrolled = lazy(
  () => import("./pages/educator/StudentsEnrolled"),
);
const EditCourse = lazy(() => import("./pages/educator/EditCourse"));

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
  </div>
);

function App() {
  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="text-default min-h-screen bg-white text-gray-900">
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
      <Suspense fallback={<PageFallback />}>
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
      </Suspense>
    </div>
  );
}

export default App;
