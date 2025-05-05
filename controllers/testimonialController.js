import Testimonial from '../models/testimonialModel.js';

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Public or Admin (depending on auth setup)
export const createTestimonial = async (req, res) => {
  try {
    const { name, position, company, message, avatar } = req.body;

    if (!name || !message) {
      return res.status(400).json({ message: 'Name and message are required.' });
    }

    const testimonial = new Testimonial({ name, position, company, message, avatar });
    await testimonial.save();

    res.status(201).json({ message: 'Testimonial created successfully.', testimonial });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ message: 'Server error while creating testimonial.', error: error.message });
  }
};

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Server error while fetching testimonials.', error: error.message });
  }
};

// @desc    Get a testimonial by ID
// @route   GET /api/testimonials/:id
// @access  Public
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found.' });
    }

    res.status(200).json(testimonial);
  } catch (error) {
    console.error('Error getting testimonial:', error);
    res.status(500).json({ message: 'Server error while getting testimonial.', error: error.message });
  }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Admin
export const updateTestimonial = async (req, res) => {
  try {
    const { name, position, company, message, avatar } = req.body;

    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found.' });
    }

    testimonial.name = name || testimonial.name;
    testimonial.position = position || testimonial.position;
    testimonial.company = company || testimonial.company;
    testimonial.message = message || testimonial.message;
    testimonial.avatar = avatar || testimonial.avatar;

    const updated = await testimonial.save();
    res.status(200).json({ message: 'Testimonial updated successfully.', testimonial: updated });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ message: 'Server error while updating testimonial.', error: error.message });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Admin
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id); // Using findByIdAndDelete

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found.' });
    }

    res.status(200).json({ message: 'Testimonial deleted successfully.' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ message: 'Server error while deleting testimonial.', error: error.message });
  }
};
