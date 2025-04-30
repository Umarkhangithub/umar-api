import cloudinary from './cloudinary.js';

export const deleteImage = async (publicId) => {
  try {
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    //   console.log(`Image with public_id ${publicId} deleted from Cloudinary.`);
    }
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
  }
};
