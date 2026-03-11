import express from "express";

import {
  getUserData,
  userEnrolledCourses,
  purchaseCourse,
  updateUserCourseProgress,
  getUserCourseProgress,
  getUserAllCourseProgress,
  addUserRating,
} from "../controllers/userController.js";
import { verifyStripePayment } from "../controllers/userController.js";
const userRouter = express.Router();
userRouter.get("/data", getUserData);
userRouter.get("/enrolled-courses", userEnrolledCourses);
userRouter.post("/purchase", purchaseCourse);
userRouter.post("/update-course-progress", updateUserCourseProgress);
userRouter.post("/get-course-progress", getUserCourseProgress);
userRouter.get("/all-course-progress", getUserAllCourseProgress);
userRouter.post("/add-rating", addUserRating);
userRouter.get("/verify-payment", verifyStripePayment);
export default userRouter;
