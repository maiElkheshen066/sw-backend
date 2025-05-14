const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async ({ email, subject, message }) => {
  try {
    const response = await axios.post(
      `https://sandbox.api.mailtrap.io/api/send/${process.env.MAILTRAP_INBOX_ID}`,
      {
        from: {
          email: process.env.MAILTRAP_SENDER_EMAIL,
          name: process.env.MAILTRAP_SENDER_NAME,
        },
        to: [{ email }],
        subject,
        text: message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MAILTRAP_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`✅ Email sent to ${email}`);
  } catch (err) {
    console.error('❌ Error sending email:', err.response?.data || err.message);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
