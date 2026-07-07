// utils/email.js
const sendEmail = async ({ name, email, subject, message }) => {
  const payload = {
    sender: { name: "Portfolio Contact", email: process.env.EMAIL_USER }, 
    to: [{ email: process.env.EMAIL_TO || 'akshayayuvaraj2006@gmail.com' }],
    subject: `📬 New Message: ${subject || 'Portfolio Contact'}`,
    htmlContent: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `,
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      // Log the full error details for debugging
      console.error("Brevo API Error Details:", JSON.stringify(data));
      throw new Error(`Brevo API Error: ${data.message || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    console.error("Failed to send email via Brevo:", error.message);
    throw error;
  }
};

module.exports = { sendEmail };