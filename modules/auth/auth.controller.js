// Package imports
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const {default: to} = require('await-to-js');

// Constant Imports
const authConstants = require('./auth.constants');
const globalConstants = require('../../constants/constants.js');

// Model imports
const User = require('./auth.model');

// Logger import
const logger = require('../../config/logger/logger');

/**
 * Created login controller to send response to the user on login
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const loginCtrl = async (req, res) => {
  if (req.user) {
    return res.status(200).json({success: 1, message: globalConstants.responseMessages.logInUser.success, data: req.user});
  } else {
    logger.error(authConstants.labels.loginCtrl.noUserInReq, req);
    return res.status(200).json({success: 0, message: globalConstants.responseMessages.logInUser.failure, data: null});
  }
};

/**
 * Created signup controller to send response to the user on signup
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @return {Object}
*/
const signupCtrl = async (req, res, next) => {
  if (req.user) {
    return res.status(200).json({success: 1, message: globalConstants.responseMessages.signUpUser.success, data: req.user});
  } else {
    logger.error(authConstants.labels.signupCtrl.noUserInReq, req);
    return res.status(200).json({success: 0, message: globalConstants.responseMessages.signUpUser.failure, data: null});
  }
};

/**
 * Created logout controller that removs the user session
 * @param {Object} req
 * @param {Object} res
*/
const logoutCtrl = (req, res) => {
  req.logOut(function(err) {
    if (err) {
      logger.error(authConstants.labels.logoutCtrl.failure, req, err);
      return res.status(406).json({success: 0, message: authConstants.responseMessages.logOutUser.failure, data: null});
    }
    return res.status(200).json({success: 1, message: authConstants.responseMessages.logOutUser.success, data: null});
  });
};

/**
 * Created controller to change password
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const changePasswordCtrl = async (req, res) => {
  if (!req.user) {
    logger.error(authConstants.labels.changePasswordCtrl.noUserInReq, req.user);
    return res.status(406).json({success: 0, message: globalConstants.responseMessages.loggedInUser.failure, data: null});
  }

  const password = req.body.password;
  const newPassword = req.body.newPassword;
  const [err, user] = await to(User.findById({_id: req.user._id}));

  if (err) {
    logger.error(authConstants.labels.changePasswordCtrl.findingUser.failure, err);
    return res.status(406).json({success: 0, message: authConstants.responseMessages.changePassword.failure, data: null});
  }

  if (!user) {
    return res.status(406).json({success: 0, message: authConstants.responseMessages.changePassword.wrongCredentails, data: null});
  }

  if ((user.githubId || user.googleId) && user.password) {
    if (!(await user.isPasswordMatched(password))) {
      return res.status(406).json({success: 0, message: authConstants.responseMessages.changePassword.wrongCredentails, data: null});
    }
  }
  if (user.password) {
    if (!(await user.isPasswordMatched(password))) {
      return res.status(406).json({success: 0, message: authConstants.responseMessages.changePassword.wrongCredentails, data: null});
    }
  }
  user.password = newPassword;
  const [passwordSavingErr, passwordSaved] = await to(user.save());

  if (passwordSavingErr) {
    logger.error(authConstants.labels.changePasswordCtrl.savingNewPassword.failure, passwordSavingErr);
    return res.status(501).json({success: 0, message: authConstants.responseMessages.changePassword.failure, data: null});
  }

  if (passwordSaved) {
    return res.status(200).json({success: 1, message: authConstants.responseMessages.changePassword.success, data: user});
  } else {
    logger.error(authConstants.labels.changePasswordCtrl.savingNewPassword.failure, passwordSaved);
    return res.status(501).json({success: 0, message: authConstants.responseMessages.changePassword.failure, data: null});
  }
};

/**
 * Created controller to handle forgot password. It simply mails the user with new password and link to update it
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
*/
const forgotPasswordCtrl = async (req, res) => {
  const [err, user] = await to(User.findOne({email: req.body.email}));

  if (err) {
    logger.error(authConstants.labels.forgotPasswordCtrl.findingUser.failure, err);
    return res.status(406).json({success: 0, message: authConstants.responseMessages.forgotPassword.failure, data: null});
  }

  if (!user) {
    return res.status(404).json({success: 0, message: authConstants.responseMessages.forgotPassword.resetPassword.wrongCredentails, data: null});
  }

  const [tokenGeneratingError, token] = await to(user.generatePasswordResetToken());

  if (tokenGeneratingError) {
    logger.error(authConstants.labels.forgotPasswordCtrl.token.generatingError, tokenGeneratingError);
    return res.status(501).json({success: 0, message: authConstants.responseMessages.forgotPassword.failure, data: null});
  }

  const [tokenSavingErr, savedToken] = await to(user.save());

  if (tokenSavingErr) {
    logger.error(authConstants.labels.forgotPasswordCtrl.token.savingError, tokenSavingErr);
    return res.status(501).json({success: 0, message: authConstants.responseMessages.forgotPassword.failure, data: null});
  }

  if (!savedToken) {
    logger.error(authConstants.labels.forgotPasswordCtrl.token.savingError, savedToken);
    return res.status(409).json({success: 0, message: authConstants.responseMessages.generalErrorMessage, data: null});
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const [emailTransportErr, info] = await to(transporter.sendMail({
    from: `${process.env.EMAIL_FROM} <process.env.EMAIL_USER>`,
    to: req.body.email,
    subject: authConstants.responseMessages.forgotPassword.resetPasswordEmail.emailSubject,
    text: authConstants.responseMessages.forgotPassword.resetPasswordEmail.emailText,
    html: `<a href="http://localhost:4000/api/auth/local-resetpassword/${token}" target="_blank">Reset my password</a>
    <h2>Your new password would be the following</h2>
    <b style='text-align:center; color:blue'>${token.slice(token.length-10)}</b>
    <br />
    <p>Please change it soon after logging in✨✨</p>`,
  }));

  if (emailTransportErr) {
    logger.error(authConstants.labels.forgotPasswordCtrl.emailSendingError, emailTransportErr);
    return res.status(501).json({success: 0, message: authConstants.responseMessages.forgotPassword.failure, data: null});
  }

  if (info.accepted[0] === req.body.email) {
    return res.status(200).json({success: 1, message: authConstants.responseMessages.forgotPassword.resetPasswordEmail.success, data: null});
  } else {
    logger.error(authConstants.labels.forgotPasswordCtrl.emailSendingUnkownError, info);
    return res.status(500).json({success: 0, message: authConstants.responseMessages.forgotPassword.resetPasswordEmail.failure, data: null});
  }
};

/**
 * Created controller to actually update the password. Its route is sent by the mail for secure password change
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
*/
const resetPasswordCtrl = async (req, res) => {
  const {token} = req.params;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const [err, user] = await to(User.findById(decoded.id));

  if (!user || err) {
    logger.error(authConstants.labels.resetPasswordCtrl.findingUser.failure, err, decoded, req.params);
    return res.status(409).send(authConstants.responseMessages.generalErrorMessage);
  }

  if (user.passwordResetToken !== token) return res.status(404).send(authConstants.responseMessages.forgotPassword.resetPassword.tokenExpiredMessage);

  user.password = token.slice(token.length-10);
  user.passwordResetToken = undefined;
  const [userSavingErr, savedUser] = await to(user.save());

  if (userSavingErr || !savedUser) {
    logger.error(authConstants.labels.resetPasswordCtrl.savingPassword.failure, userSavingErr, savedUser);
    return res.status(409).send({success: 0, message: authConstants.responseMessages.forgotPassword.resetPassword.failure, data: userSavingErr});
  } else {
    return res.status(200).send(authConstants.responseMessages.forgotPassword.resetPassword.success);
  }
};

/**
 * Created controller to get the complete user data form db
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const getProfileData = async (req, res) => {
  if (!req.user) {
    logger.error(authConstants.labels.getProfileDataCtrl.noUserInReq, req);
    return res.status(406).json({success: 0, message: globalConstants.responseMessages.loggedInUser.failure, data: null});
  }
  const user = req.user;

  if (user) {
    return res.status(200).send({success: 1, message: authConstants.responseMessages.userProfileData.success, data: user});
  } else {
    return res.status(404).send({success: 0, message: authConstants.responseMessages.userProfileData.failure, data: null});
  }
};

/**
 * Created controller to update the profile information
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const updateProfileCtrl = async (req, res) => {
  if (!req.user) {
    logger.error(authConstants.labels.updateProfileDataCtrl.noUserInReq, req.user);
    return res.status(406).json({success: 0, message: globalConstants.responseMessages.loggedInUser.failure, data: null});
  }
  const user = req.user;

  const [updatingUserErr, updatedUser]= await to(User.findByIdAndUpdate(user._id, {...req.body}, {new: true}));

  if (updatingUserErr) {
    logger.error(authConstants.labels.updateProfileDataCtrl.updatingUser.failure, updatingUserErr);
    return res.status(409).send({success: 0, message: authConstants.responseMessages.updateUserProfile.failure, data: updatingUserErr});
  }

  if (updatedUser) {
    return res.status(200).send({success: 1, message: authConstants.responseMessages.updateUserProfile.success, data: updatedUser});
  } else {
    logger.error(authConstants.labels.updateProfileDataCtrl.updatingUser.failure, updatedUser, updatingUserErr);
    return res.status(409).send({success: 0, message: authConstants.responseMessages.updateUserProfile.failure, data: null});
  }
};

/**
 * Created controller to login/signup usign google account
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const googleCtrl = async (req, res) => {
  return res.status(200).send(globalConstants.responseMessages.logInUser.socialLogin.success);
};

/**
 * Created controller to login/signup usign github account
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const githubCtrl = async (req, res) => {
  return res.status(200).send(globalConstants.responseMessages.logInUser.socialLogin.success);
};

module.exports = {loginCtrl, signupCtrl, forgotPasswordCtrl, changePasswordCtrl, logoutCtrl, resetPasswordCtrl, getProfileData, updateProfileCtrl, googleCtrl, githubCtrl};
