import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import testimonialsRoutes from './routes/testimonialRoutes.js';
import skillsRoutes from './routes/skillsRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

import { generalLimiter } from './middlewares/rateLimitMiddleware.js';
import connectDB from './config/db.js';


const app = express();
const PORT = process.env.PORT || 3000;

// ==================
// Global Middlewares
// ==================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(generalLimiter); // Uncomment in production

// ==============
// API Routes
// ==============
app.use("/api/admin", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/testimonials", testimonialsRoutes);

// ==============
// 404 Handler
// ==============
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ==============
// Start Server
// ==============

export default app
