const nodemailer = require('nodemailer')

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

/**
 * Send notification email to Akshaya when a new contact message arrives
 */
const sendNotificationEmail = async ({ name, email, subject, message }) => {
  const transporter = createTransporter()

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    // Bulletproof fallback: uses the env variable or safely defaults to your email address directly
    to: process.env.EMAIL_TO || 'yakshayayuvaraj2006@gmail.com', 
    subject: `📬 New Message: ${subject || 'Portfolio Contact'}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
        <h2 style="color: #1e293b; margin-bottom: 8px;">New Contact Message</h2>
        <p style="color: #64748b; font-size: 14px;">Someone reached out through your portfolio.</p>
        
        <div style="background: white; border-radius: 10px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 80px;">Name</td><td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #2563eb;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Subject</td><td style="padding: 8px 0; color: #1e293b;">${subject || 'N/A'}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p style="color: #1e293b; font-size: 14px; line-height: 1.6;">${message}</p>
        </div>

        <a href="mailto:${email}" style="display: inline-block; background: #2563eb; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
          Reply to ${name}
        </a>
      </div>
    `,
  })
}

/**
 * Send auto-reply thank-you email to the visitor
 */
const sendThankYouEmail = async ({ name, email }) => {
  const transporter = createTransporter()

  await transporter.sendMail({
    from: `"Akshaya Y" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}! 👋`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-flex; width: 48px; height: 48px; background: linear-gradient(135deg, #2563eb, #7c3aed); border-radius: 12px; align-items: center; justify-content: center;">
            <span style="color: white; font-weight: bold; font-size: 20px;">A</span>
          </div>
        </div>
        
        <h2 style="color: #1e293b; margin-bottom: 8px;">Hi ${name}, thanks for reaching out!</h2>
        <p style="color: #475569; line-height: 1.6; font-size: 15px;">
          Thank you for contacting me. I have received your message and will get back to you soon.
        </p>
        <p style="color: #475569; line-height: 1.6; font-size: 15px;">
          I typically respond within 24–48 hours. Looking forward to connecting!
        </p>
        
        <div style="background: white; border-radius: 10px; padding: 20px; margin: 24px 0; border-left: 4px solid #2563eb;">
          <p style="margin: 0; color: #1e293b; font-weight: 600;">Akshaya Y</p>
          <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">Aspiring SDE | MERN Stack Developer | Java Enthusiast</p>
        </div>
        
        <p style="color: #94a3b8; font-size: 12px; margin-top: 32px;">
          This is an automated response. Please do not reply to this email directly.
        </p>
      </div>
    `,
  })
}

module.exports = { sendNotificationEmail, sendThankYouEmail }