import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/authController.js';
import { loginLimiter } from '../middlewares/rateLimitMiddleware.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login',loginLimiter, loginAdmin);

export default router;

