import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import { generalLimiter } from './middlewares/rateLimitMiddleware.js';
import testimonialsRoutes from './routes/testimonialRoutes.js';
import skillsRoutes from './routes/skillsRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Built-in middleware to handle JSON bodies
app.use(express.urlencoded({ extended: true })); // Built-in middleware to handle URL-encoded data
// app.use(generalLimiter); 


// Routes
app.use("/api/admin", authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', servicesRoutes); 
app.use('/api/skills', skillsRoutes); 
app.use('/api/profile', profileRoutes); 
app.use('/api/testimonials', testimonialsRoutes); 

export default app;
