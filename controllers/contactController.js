import Contact from '../models/contactModels.js';
import sendEmail from '../utils/sendEmail.js';

export const submitContactForm = async (req, res) => {
  // Log to check the incoming data

  const { name, email, message, phone } = req.body;

  // Validation: ensure all fields are provided
  if (!name || !email || !message || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Save to database (you can customize this part as per your Contact model)
    const contact = new Contact({ name, email, message, phone });
    await contact.save();

    // Prepare the email
    const subject = `New Contact from ${name}`;
    const text = `
New Contact Form Submission:

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
`;

    // Send email via Nodemailer
    await sendEmail(subject, text, email);

    // Respond to the client
    res.status(201).json({ message: 'Message sent and saved successfully' });
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    res.status(500).json({ message: 'Server error while sending message' });
  }
};
