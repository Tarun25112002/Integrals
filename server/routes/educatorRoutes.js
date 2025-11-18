import express from "express";
import {
  addCourse,
  updateRoleToEducator,
  getEducatorCoursses,
  educatorDashboardData,
  getEnrolledStudents,
  updateCourse,
} from "../controllers/educatorController.js";
import upload from "../configs/multer.js";
import { protectEducator } from "../middlewares/authMiddleware.js";

const educatorRouter = express.Router();

// Public route
educatorRouter.get("/update-role", updateRoleToEducator);

// Protected routes
educatorRouter.post(
  "/add-course",
  upload.single("image"),
  protectEducator,
  addCourse
);
educatorRouter.get("/courses", protectEducator, getEducatorCoursses);
educatorRouter.get("/dashboard", protectEducator, educatorDashboardData);
educatorRouter.get("/enrolled-students", protectEducator, getEnrolledStudents);
educatorRouter.put(
  "/course/:id",
  upload.single("image"),
  protectEducator,
  updateCourse
);

export default educatorRouter;
