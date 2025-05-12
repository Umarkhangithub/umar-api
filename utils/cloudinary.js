import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier"; // Ensure this is installed: npm i streamifier

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload to Cloudinary with correct resource type
export const uploadToCloudinary = (
  fileBuffer,
  folder,
  resourceType = "auto"
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType, // can be "image", "raw", "auto"
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// Delete from Cloudinary by public_id
export const deleteFromCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    throw new Error("Failed to delete from Cloudinary: " + error.message);
  }
};

export default cloudinary;
