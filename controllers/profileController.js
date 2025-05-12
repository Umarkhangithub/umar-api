import Profile from "../models/profileModel.js";
import path from "path";
import axios from "axios";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";


/**
 * Create or update the user profile
 */
export const createOrUpdateProfile = async (req, res) => {
  try {
    const { name, github, linkedin, twitter, instagram, youtube  } = req.body;
    const avatar = req.files?.avatar;
    const resume = req.files?.resume;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    // Find existing profile
    let profile = await Profile.findOne();

    // Upload avatar and resume if provided
    let avatarUpload = avatar
      ? await uploadToCloudinary(avatar.data, "portfolio/avatar", "image")
      : null;

    let resumeUpload = resume
      ? await uploadToCloudinary(resume.data, "portfolio/resume", "raw")
      : null;

    // Build updated profile fields
    const updatedData = {
      name: name.trim(),
      socialLinks: { github, linkedin, twitter, instagram, youtube },
    };

    if (avatarUpload) updatedData.avatar = avatarUpload;
    if (resumeUpload) updatedData.resume = resumeUpload;

    if (profile) {
      // Delete old files from Cloudinary if replaced
      if (avatarUpload && profile.avatar?.public_id) {
        await deleteFromCloudinary(profile.avatar.public_id);
      }
      if (resumeUpload && profile.resume?.public_id) {
        await deleteFromCloudinary(profile.resume.public_id);
      }

      // Update existing profile
      profile = await Profile.findByIdAndUpdate(profile._id, updatedData, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        profile,
      });
    } else {
      // Create new profile
      profile = await Profile.create(updatedData);
      return res.status(201).json({
        success: true,
        message: "Profile created successfully.",
        profile,
      });
    }
  } catch (error) {
    console.error("Error in createOrUpdateProfile:", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      error: error.message,
    });
  }
};

// /**
//  * Get the current profile
//  */
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found." });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch profile.",
        error: error.message,
      });
  }
};

/**
 * Get only social links from profile
 */
export const getSocialLinks = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found." });
    }

    res.status(200).json({ success: true, socialLinks: profile.socialLinks });
  } catch (error) {
    console.error("Error fetching social links:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch social links.",
        error: error.message,
      });
  }
};

/**
 * Download the resume file from Cloudinary (as PDF)
 */
export const downloadResume = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile || !profile.resume?.url) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    const fileUrl = profile.resume.url;

    // Derive a clean filename (remove query params, fallback to default)
    const fileName = path.basename(new URL(fileUrl).pathname) || "resume.pdf";

    // Download the file as a stream
    const fileResponse = await axios.get(fileUrl, { responseType: "stream" });

    // Set headers for file download
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/pdf");

    // Stream file to client
    fileResponse.data.pipe(res);
  } catch (error) {
    console.error("Resume download error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to download resume.",
      error: error.message,
    });
  }
};

/**
 * Get avatar info (not image download)
 */
export const getAvatar = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile || !profile.avatar) {
      return res
        .status(404)
        .json({ success: false, message: "Avatar not found." });
    }

    res.status(200).json({ success: true, avatar: profile.avatar });
  } catch (error) {
    console.error("Avatar fetch error:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch avatar.",
        error: error.message,
      });
  }
};
