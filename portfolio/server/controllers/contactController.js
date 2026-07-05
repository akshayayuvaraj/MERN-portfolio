const Contact = require('../models/Contact')
const { sendNotificationEmail, sendThankYouEmail } = require('../utils/email')

/**
 * POST /api/contact
 * Submit a contact form message
 */
const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body
    let contactId = null

    // Check if MongoDB is actually connected before attempting an operation
    // readyState === 1 means fully connected
    if (Contact.db && Contact.db.readyState === 1) {
      try {
        const [contact] = await Contact.create([
          {
            name,
            email,
            subject,
            message,
            ip: req.ip,
          }
        ], { wtimeout: 2000 });
        
        if (contact) contactId = contact._id;
      } catch (dbError) {
        console.error('[Background Error] Failed to save contact message to MongoDB:', dbError.message)
      }
    } else {
      console.log('⚠️ MongoDB is disconnected. Skipping database write to avoid timeout lag...');
    }

    // Trigger emails and explicitly log success or error in the terminal
    sendNotificationEmail({ name, email, subject, message })
      .then(() => console.log('📧 Notification email sent successfully!'))
      .catch(err => console.error('❌ Notification email failed:', err.message))

    sendThankYouEmail({ name, email })
      .then(() => console.log('📧 Thank you email sent successfully!'))
      .catch(err => console.error('❌ Thank you email failed:', err.message))

    // Send a success response back to the frontend immediately
    return res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      data: { id: contactId },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { submitContact }