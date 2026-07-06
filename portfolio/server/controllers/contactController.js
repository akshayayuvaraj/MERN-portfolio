// controllers/contactController.js
const Contact = require('../models/Contact');
const { sendEmail } = require('../utils/email');

/**
 * POST /api/contact
 * Submit a contact form message
 */
const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Save to MongoDB (Best practice to keep a record of all submissions)
    let contactId = null;
    if (Contact.db && Contact.db.readyState === 1) {
      try {
        const newContact = await Contact.create({
          name,
          email,
          subject,
          message,
          ip: req.ip,
        });
        contactId = newContact._id;
      } catch (dbError) {
        console.error('[Database Error]:', dbError.message);
      }
    }

    // 2. Trigger email via API (Fire-and-forget)
    // The response is sent immediately, while the email process runs in the background.
    sendEmail({ name, email, subject, message })
      .then(() => console.log('📧 Notification email sent successfully!'))
      .catch(err => console.error('📧 Email failed:', err.message));

    // 3. Send success response IMMEDIATELY to stop the "Sending..." loop
    return res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      data: { id: contactId },
    });
  } catch (error) {
    console.error('[Controller Error]:', error);
    next(error);
  }
};

module.exports = { submitContact };