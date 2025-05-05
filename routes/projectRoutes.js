import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import upload from '../middlewares/uploadMiddleware.js';
import protect from '../middlewares/authMiddleware.js'; // if auth is enabled
import { validateProject } from '../middlewares/validateProjectMiddleware.js';
const router = express.Router();

router.post('/',   upload.single('image'), validateProject, createProject);
router.get('/', getAllProjects);
router.get('/:id/view', getProjectById);
router.put('/:id/edit',   upload.single('image'), updateProject);
router.delete('/:id',  deleteProject);

export default router;
