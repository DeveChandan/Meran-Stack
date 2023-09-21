const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
     
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Set up the email options
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: options.email,
      subject: options.subject,
      text: options.message, 
    };
 
    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    // Log the error and handle it appropriately
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
