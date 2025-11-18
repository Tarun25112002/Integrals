import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import cloudinary from "../configs/cloudinary.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";

export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: "educator" },
    });
    res.json({
      success: true,
      message: "Role updated to educator successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error updating role",
      error: error.message,
    });
  }
};

export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    console.log(
      "File received:",
      imageFile ? imageFile.originalname : "No file"
    );

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail Not Attached" });
    }

    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;

    // Upload image to Cloudinary
    console.log("Uploading to Cloudinary...");
    console.log("Cloudinary config check:", {
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
      hasCloudName: !!process.env.CLOUDINARY_NAME,
    });

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "course-thumbnails",
    });

    console.log("Upload successful:", imageUpload.secure_url);

    // Create course with thumbnail URL
    parsedCourseData.courseThumbnail = imageUpload.secure_url;
    const newCourse = await Course.create(parsedCourseData);

    res.json({
      success: true,
      message: "Course Added Successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error adding course:", error);
    res.json({ success: false, message: error.message });
  }
};

export const getEducatorCoursses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;
    const courseIds = courses.map((course) => course._id);
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });
    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        { _id: { $in: course.enrolledStudents } },
        "name imageUrl"
      );
      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }
    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        totalCourses,
        enrolledStudentsData,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getEnrolledStudents = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");
    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));
    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const educatorId = req.auth.userId;
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.json({ success: false, message: "Course not found" });
    }

    // Fix: Convert both to strings for comparison
    if (course.educator.toString() !== educatorId.toString()) {
      return res.json({ success: false, message: "Unauthorized Access" });
    }

    let parsedCourseData = {};
    if (req.body?.courseData) {
      try {
        parsedCourseData = JSON.parse(req.body.courseData);
      } catch (e) {
        return res.json({ success: false, message: "Invalid course data" });
      }
    } else {
      parsedCourseData = req.body || {};
    }

    const updates = {};

    if (typeof parsedCourseData.courseTitle === "string") {
      updates.courseTitle = parsedCourseData.courseTitle.trim();
    }
    if (typeof parsedCourseData.courseDescription === "string") {
      updates.courseDescription = parsedCourseData.courseDescription;
    }
    if (parsedCourseData.coursePrice !== undefined) {
      const price = Number(parsedCourseData.coursePrice);
      if (isNaN(price) || price <= 0) {
        return res.json({ success: false, message: "Invalid price" });
      }
      updates.coursePrice = price;
    }
    if (parsedCourseData.discount !== undefined) {
      const discount = Math.min(
        Math.max(Number(parsedCourseData.discount) || 0, 0),
        100
      );
      updates.discount = discount;
    }
    if (Array.isArray(parsedCourseData.courseContent)) {
      updates.courseContent = parsedCourseData.courseContent;
    }
    if (parsedCourseData.isPublished !== undefined) {
      updates.isPublished = Boolean(parsedCourseData.isPublished);
    }

    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "course-thumbnails",
      });
      updates.courseThumbnail = imageUpload.secure_url;
    }

    Object.assign(course, updates);
    await course.save();

    return res.json({ success: true, course });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
