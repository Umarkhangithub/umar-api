import Contact from '../models/contactModels.js';
import sendEmail from '../utils/sendEmail.js';

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
