
import { useEffect, useState } from "react";

import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/student/Loading";
const StudentsEnrolled = () => {
const [studentEnrolled, setStudentEnrolled] = useState(null);
const fetchEnrolledStudents = async () => {
  setStudentEnrolled(dummyStudentEnrolled);
}
useEffect(() => {
  fetchEnrolledStudents();
}, []);
  return studentEnrolled ? (
    <div>
      <h1>Students enrolled</h1>
    </div>
  ):<Loading />
}

export default StudentsEnrolled