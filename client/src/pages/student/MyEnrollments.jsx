import { useState, useEffect } from "react";

const MyEnrollments = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>
        {isLoading ? { isLoading } : "My Enrollments"}
      </h1>
    </div>
  );
};

export default MyEnrollments;
