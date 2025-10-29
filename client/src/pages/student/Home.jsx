import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Hero from "../../components/student/Hero";
import CoursesSection from "../../components/student/CoursesSection";
import CompaniesSection from "../../components/student/Companies";
import TestimonialsSection from "../../components/student/TestimonialsSection";
import CallToAction from "../../components/student/CallToAction";
import Footer from "../../components/student/Footer";
import Loading from "../../components/student/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { allCourses } = useContext(AppContext);

  useEffect(() => {
    if (allCourses.length > 0) {
      setIsLoading(false);
    }
  }, [allCourses]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center space-y-7 text-center fade-in">
      <Hero />
      <CompaniesSection />
      <CoursesSection />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
