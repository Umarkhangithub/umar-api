import Contact from '../models/contactModel.js';
import sendEmail from '../utils/sendEmail.js';

// Submit Contact Form
export const submitContactForm = async (req, res) => {
  const { name, email, message, phone } = req.body;


  // Basic validation
  if (!name || !email || !message || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Optional: Email format check (basic regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Save to MongoDB
    const contact = new Contact({ name, email, message, phone });
    await contact.save();

    // Email content
    const subject = `New Contact Message from ${name}`;
    const text = `
You received a new message from your portfolio/contact form:

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
    `;

    // Send email
    await sendEmail(subject, text, email); // Optionally add your own email as recipient

    res.status(201).json({ message: 'Message sent and saved successfully' });
  } catch (error) {
    console.error('Error in submitContactForm:', error.message);
    res.status(500).json({ message: 'Failed to process the contact form', error: error.message });
  }
};

// Get Contact Messages
export const getContactMessages = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // default page 1
  const limit = parseInt(req.query.limit) || 6; // default limit 10

  if (page < 1 || limit < 1) {
    return res.status(400).json({ message: 'Page and limit must be greater than 0' });
  }

  const skip = (page - 1) * limit;

  try {
    const total = await Contact.countDocuments();
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: 'Contact messages fetched successfully',
      contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: skip + limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error.message);
    res.status(500).json({
      message: 'Failed to fetch contact messages',
      error: error.message,
    });
  }
};

// Get contact Message by ID

export const getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id); 
    if(!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.status(200).json({ message: 'Contact message fetched successfully', contact });
  }
  catch (error) {
    console.error('Error fetching contact message:', error.message);
    res.status(500).json({
      message: 'Failed to fetch contact message',
      error: error.message,
    });
  }
}


// Delete Contact Message
export const deleteContactMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.status(200).json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact message:', error.message);
    res.status(500).json({
      message: 'Failed to delete contact message',
      error: error.message,
    });
  }
};
