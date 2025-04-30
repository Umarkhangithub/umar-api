import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// POST request to handle contact form submission

router.post('/', submitContactForm);

export default router;
