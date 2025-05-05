// routes/testimonialRoutes.js
import express from 'express';
import { createTestimonial, getAllTestimonials, deleteTestimonial, updateTestimonial } from '../controllers/testimonialController.js';

const router = express.Router();

router.post('/', createTestimonial);      // Add a testimonial
router.get('/', getAllTestimonials);      // Get all testimonials
router.put('/:id', updateTestimonial);      // update a testimonials
router.delete('/:id', deleteTestimonial);      // delete a testimonials

export default router;
