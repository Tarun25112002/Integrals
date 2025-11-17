import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
};

// Log config to verify (remove in production)
console.log("Cloudinary Config:", {
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key
    ? "***" + cloudinaryConfig.api_key.slice(-4)
    : "missing",
  api_secret: cloudinaryConfig.api_secret ? "***set" : "missing",
});

cloudinary.config(cloudinaryConfig);

export default cloudinary;
