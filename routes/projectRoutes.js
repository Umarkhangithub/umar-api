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

const router = express.Router();

router.post('/', protect,  upload.single('image'), createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', protect,  upload.single('image'), updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
