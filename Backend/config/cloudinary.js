import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
const uploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return uploadResult.secure_url;
    console.log(uploadResult);
  } catch (error) {
    fs.unlinkSync(filePath);
    return res
      .status(500)
      .json({ message: `Cloudinary Upload Error: ${error.message}` });
  }
};
export default uploadOnCloudinary;
