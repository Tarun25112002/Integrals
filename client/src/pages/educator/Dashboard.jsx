import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { dummyDashboardData, assets } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { currency } = useContext(AppContext);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <Loading />;
  }

  const enrolledCount = dashboardData.enrolledStudentsData?.length ?? 0;
  const totalCourses = dashboardData.totalCourses ?? 0;
  const totalEarnings = dashboardData.totalEarnings ?? 0;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500">
          Track your teaching performance and student engagement
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {/* Students Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:bg-blue-50/30 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Total Students
              </p>
              <p className="text-3xl font-semibold text-gray-900">
                {enrolledCount}
              </p>
              <p className="text-xs text-green-600 mt-2">
                ↑ Active enrollments
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Courses Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:bg-blue-50/30 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Active Courses
              </p>
              <p className="text-3xl font-semibold text-gray-900">
                {totalCourses}
              </p>
              <p className="text-xs text-gray-500 mt-2">Published courses</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:bg-blue-50/30 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Total Revenue
              </p>
              <p className="text-3xl font-semibold text-gray-900">
                {currency}
                {totalEarnings}
              </p>
              <p className="text-xs text-gray-500 mt-2">Lifetime earnings</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Students - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-900">
              Recent Enrollments
            </h2>
          </div>
          <div className="p-6">
            {enrolledCount > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="pb-3">Student</th>
                      <th className="pb-3">Course</th>
                      <th className="pb-3 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dashboardData.enrolledStudentsData
                      .slice(0, 5)
                      .map((enrollment, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-50/30 transition-colors cursor-pointer"
                        >
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              {enrollment.student?.imageUrl ? (
                                <img
                                  src={enrollment.student.imageUrl}
                                  alt={enrollment.student.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                  {enrollment.student?.name?.charAt(0) || "S"}
                                </div>
                              )}
                              <span className="text-sm font-medium text-gray-900">
                                {enrollment.student?.name || "Unknown Student"}
                              </span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="text-sm text-gray-600">
                              {enrollment.courseTitle || "N/A"}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <span className="text-sm text-gray-500">
                              {enrollment.enrolledDate || "Recently"}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">
                  No students enrolled yet
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/educator/add-course"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors text-center"
              >
                Create New Course
              </Link>
              <Link
                to="/educator/my-courses"
                className="block w-full bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors text-center"
              >
                Manage Courses
              </Link>
              <Link
                to="/educator/student-enrolled"
                className="block w-full bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors text-center"
              >
                View All Students
              </Link>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
            <h3 className="text-sm font-semibold mb-2">Performance</h3>
            <p className="text-2xl font-bold mb-1">
              {enrolledCount > 0 ? "Great!" : "Getting Started"}
            </p>
            <p className="text-xs text-blue-100">
              {enrolledCount > 0
                ? `You have ${enrolledCount} active student${
                    enrolledCount !== 1 ? "s" : ""
                  }`
                : "Create your first course to start teaching"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
