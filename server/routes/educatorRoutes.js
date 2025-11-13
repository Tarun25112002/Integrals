import express from 'express';
import { addCourse, updateRoleToEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/authMiddleware.js';
import { getEducatorCoursses } from '../controllers/educatorController.js';
import { educatorDashboardData } from '../controllers/educatorController.js';
import { getEnrolledStudents } from '../controllers/educatorController.js';

const educatorRouter = express.Router();

educatorRouter.get('/update-role', updateRoleToEducator);
educatorRouter.post('/add-course', upload.single('image'),protectEducator, addCourse);
export default educatorRouter;

educatorRouter.get('/courses', protectEducator, getEducatorCoursses);
educatorRouter.get('/dashboard  ', protectEducator, educatorDashboardData);
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudents);