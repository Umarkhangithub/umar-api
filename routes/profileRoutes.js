import express from "express";
import { createOrUpdateProfile, downloadResume, getAvatar, getProfile, getSocialLinks } from "../controllers/profileController.js";
import protect from "../middlewares/authMiddleware.js";
import fileUpload from "express-fileupload";

const router = express.Router();

// Middleware for file upload
router.use(fileUpload({
  useTempFiles: false,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
}));

router.get("/" ,getProfile);
router.get("/avatar" ,getAvatar);
router.get("/resume/download" ,downloadResume);
router.get("/social-links" ,getSocialLinks);
router.post("/", createOrUpdateProfile);

export default router;
