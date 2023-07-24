/*
Copyright (c) 2023, Xgrid Inc, http://xgrid.co

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Package Imports
const nodemailer = require('nodemailer');

/**
 * Function to send email to user
 * @param {String} token
 * @param {String} toEmail
 * @return {nodemailer.Transporter<SMTPTransport.SentMessageInfo>}
 */
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
    html: `<a href="http://localhost:4000/api/auth/reset-password/${token}" target="_blank">Reset my password</a>
        <h2>Your new password would be the following</h2>
        <b style='text-align:center; color:blue'>${token.slice(token.length-10)}</b>
        <br />
        <p>Please change it soon after logging in✨✨</p>`,
  });
};

/**
 * Function to create jwt payload
 * @param {Object} user
 * @return {Object}
 */
const createJwtPayload = (user) => {
  const payload = {
    ...user,
  };

  return payload;
};

module.exports = { sendPasswordResetMail, createJwtPayload };
