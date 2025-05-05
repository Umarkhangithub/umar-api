import express from 'express';
import { deleteContactMessage, getContactById, getContactMessages, submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// POST request to handle contact form submission

router.get('/', getContactMessages )
router.get('/:id', getContactById )
router.delete('/:id', deleteContactMessage )
router.post('/', submitContactForm);


export default router;
