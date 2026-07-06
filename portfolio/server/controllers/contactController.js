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

    // 1. Save to MongoDB
    if (Contact.db && Contact.db.readyState === 1) {
      try {
        const contact = await Contact.create({
          name,
          email,
          subject,
          message,
          ip: req.ip,
        });
        contactId = contact._id;
      } catch (dbError) {
        console.error('[Database Error]:', dbError.message)
      }
    }

    // 2. FIRE AND FORGET: Removed 'await' to prevent UI hanging
    // The server will now return the success response immediately
    Promise.allSettled([
      sendNotificationEmail({ name, email, subject, message }),
      sendThankYouEmail({ name, email })
    ]).then((results) => {
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`❌ Email ${index === 0 ? 'Notification' : 'ThankYou'} failed:`, result.reason.message);
        } else {
          console.log(`📧 Email ${index === 0 ? 'Notification' : 'ThankYou'} sent successfully!`);
        }
      });
    });

    // 3. Send success response IMMEDIATELY
    return res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      data: { id: contactId },
    })
  } catch (error) {
    console.error('[Controller Error]:', error);
    next(error)
  }
}

module.exports = { submitContact }