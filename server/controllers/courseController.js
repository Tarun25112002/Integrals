import Course from "../models/Course.js";

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select("-courseContent -enrolledStudents")
      .populate({
        path: "educator",
        select: "name imageUrl",
      });

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCourseId = async (req, res) => {
  const { id } = req.params;

  try {
    const courseData = await Course.findById(id).populate({
      path: "educator",
      select: "name imageUrl",
    });

    if (!courseData) {
      return res.json({ success: false, message: "Course not found" });
    }

    // Only hide non-preview lecture URLs when the requester is not enrolled and not the educator
    const userId = req.auth?.userId;
    const isEducatorViewing =
      (typeof courseData.educator === "object" && courseData.educator?._id?.toString() === userId) ||
      (typeof courseData.educator === "string" && courseData.educator === userId);
    const isEnrolled =
      Array.isArray(courseData.enrolledStudents) &&
      courseData.enrolledStudents.map((x) => x.toString()).includes(userId);

    if (!isEducatorViewing && !isEnrolled && Array.isArray(courseData.courseContent)) {
      courseData.courseContent.forEach((chapter) => {
        chapter.chapterContent.forEach((lecture) => {
          if (!lecture.isPreviewFree) {
            lecture.lectureUrl = "";
          }
        });
      });
    }

    res.json({ success: true, courseData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
