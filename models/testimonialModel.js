// models/testimonialModel.js
import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String },
  message: { type: String, required: true },
  company: { type: String },
  avatar: { type: String }, // URL to profile image
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
