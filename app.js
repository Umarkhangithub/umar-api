import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Built-in middleware to handle JSON bodies
app.use(express.urlencoded({ extended: true })); // Built-in middleware to handle URL-encoded data

// Routes
app.use("/api/admin", authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

export default app;
