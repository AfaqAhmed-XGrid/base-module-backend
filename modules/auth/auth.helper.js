// Package Imports
const nodemailer = require('nodemailer');

// Constants import
const authConstants = require('./auth.constants');

const sendPasswordResetMail = async (token, toEmail) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: `${process.env.EMAIL_FROM} <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Reset you password - Cine Info!',
    text: `Please click on the link to reset your password. The link is active for 5 minuts only!`,
    html: `<a href="http://localhost:4000/api/auth/local-resetpassword/${token}" target="_blank">Reset my password</a>
        <h2>Your new password would be the following</h2>
        <b style='text-align:center; color:blue'>${token.slice(token.length-10)}</b>
        <br />
        <p>Please change it soon after logging in✨✨</p>`,
  });
};

module.exports = { sendPasswordResetMail };
