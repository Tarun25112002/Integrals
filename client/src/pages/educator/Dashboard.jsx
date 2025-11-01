import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { dummyDashboardData, assets } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { currency } = useContext(AppContext);

  const fetchDashboardData = async () => {
    // Replace with real fetch if you have a backend. For now use dummy data.
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Show loading until dashboardData is ready
  if (!dashboardData) {
    return <Loading />;
  }

  const enrolledCount = dashboardData.enrolledStudentsData?.length ?? 0;

  return (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="space-y-5 w-full">
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.patients_icon} alt="patients_icon" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {enrolledCount}
              </p>
              <p className="text-base text-gray-500">Enrolled Students</p>
            </div>
          </div>

          {/* Add more metric cards here. Example (placeholder): */}
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.patients_icon} alt="placeholder" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.someOtherMetric ?? 0}
              </p>
              <p className="text-base text-gray-500">Another Metric</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (if you want footer here, import and render it) */}
    </div>
  );
};

export default Dashboard;
