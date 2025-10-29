import { useState, useEffect } from "react";

const Player = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen px-8 md:px-36 pt-20 fade-in">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">
        Video Player
      </h1>
      <p className="text-gray-500">Course video player will appear here.</p>
    </div>
  );
};

export default Player;
