import express from "express";
import {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skillsController.js";

const router = express.Router();

// Public Routes
router.get("/", getAllSkills);
router.get("/:id", getSkillById);

// Admin Routes
router.post("/", createSkill);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);

export default router;
