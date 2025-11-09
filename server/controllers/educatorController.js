import { clerkClient } from "@clerk/express";
import Course from '../models/Course.js';
import cloudinary from "../configs/cloudinary.js";
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: "educator" },
    });
    res.json({ message: "Role updated to educator successfully" });
  } catch (error) {
    res.json({ message: "Error updating role", error: error.message });
  }
};
export const addCourse = async (req, res) => {
  try{
    const {courseData}=req.body;
    const imageFile=req.file
    const educatorId = req.auth.userId;
if(!imageFile){
  return res.json({success:false, message:'Thumbnail Not Attached'})
}
const parsedCourseData=await JSON.parse(courseData);
parsedCourseData.educator=educatorId;
const newCourse = await Course.create(parsedCourseData);
const imageUpload= await cloudinary.uploader.upload(imageFile.path)
newCourse.courseThumbnail=imageUpload.secure_url
await newCourse.save();
res.json({success:true, message:'Course Added Successfully'})
  }catch(error){
res.json({success:false, message: error.message})
  }
}