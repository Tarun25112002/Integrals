import { useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const StudentsEnrolled = () => {
  const [studentEnrolled, setStudentEnrolled] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEnrolledStudents = async () => {
    setStudentEnrolled(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  if (!studentEnrolled) {
    return <Loading />;
  }

  const filteredStudents = studentEnrolled.filter(
    (item) =>
      item.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto pb-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Enrolled Students
          </h1>
          <p className="text-sm text-gray-500">
            View and manage all students enrolled in your courses
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-500">Total Students: </span>
            <span className="text-sm font-semibold text-gray-900">
              {studentEnrolled.length}
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by student name or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {filteredStudents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrolled Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{index + 1}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.student.imageUrl}
                          alt={item.student.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.student.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.student._id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {item.courseTitle}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">
                        {new Date(item.purchaseDate).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No students found
            </h3>
            <p className="text-sm text-gray-500">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsEnrolled;
