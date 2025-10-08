import Hero from "../../components/student/Hero";
import CoursesSection from "../../components/student/CoursesSection";
import CompaniesSection from "../../components/student/Companies";
import TestimonialsSection from "../../components/student/TestimonialsSection";
import CallToAction from "../../components/student/CallToAction"
import Footer from "../../components/student/Footer";
const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero />
      <CompaniesSection />
      <CoursesSection />
      <TestimonialsSection/>
      <CallToAction/>
      <Footer/>
    </div>
  );
};
export default Home;
