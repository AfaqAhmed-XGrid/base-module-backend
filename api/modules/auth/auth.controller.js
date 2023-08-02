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

// Package imports
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const { default: to } = require('await-to-js');
const passport = require('passport');

// Constant Imports
const authConstants = require('./auth.constants');
const globalConstants = require('../../constants/constants.js');
const statusCodes = require('../../constants/statusCodes');

// Helper Functions imports
const { sendPasswordResetMail, createJwtPayload } = require('./auth.helper');

// Model imports
const User = require('./auth.model');

// Logger import
const logger = require('../../config/logger/logger');

/**
 * Controller Function to login the user
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
 */
const login = (req, res) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      logger.error('Passport login Strategy returned error (loginController)', { error: err }, { info: info }, { user: user });
      return res.status(statusCodes.internalError).json({ success: 0, message: info?.message, data: { err } });
    }

    if (!user) {
      logger.error('passport login Strategy did not return the user (loginController)', { error: err }, { info: info });
      return res.status(statusCodes.notFound).json({ success: 0, message: info?.message, data: { err } });
    }

    const payload = createJwtPayload(user._doc);

    try {
      logger.info('Generating jwt token (loginController)', { userId: user._id });
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

      logger.info('User is logged in successfully (loginController)', { userId: user._id });
      return res.status(statusCodes.success).json({ success: 1, message: globalConstants.responseMessages.logInUser.success, token, data: { ...user._doc } });
    } catch (err) {
      logger.error('Error in generating JWT token (loginController)', { error: err });
      return res.status(statusCodes.internalError).json({ success: 0, message: globalConstants.responseMessages.logInUser.failure, data: { err } });
    }
  })(req, res);
};

/**
 * Created signup controller to send response to the user on signup
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
*/
const signup = (req, res) => {
  passport.authenticate('signup', (err, user, info) => {
    if (err) {
      logger.error('Passport signup strategy returned error (signupController)', { error: err }, { info: info }, { user: user });
      return res.status(statusCodes.internalError).json({ success: 0, message: info?.message, data: { err } });
    }

    if (!user) {
      logger.error('Passport signup strategy did not return user (signupController)', { error: err }, { info: info });
      return res.status(statusCodes.internalError).json({ success: 0, message: info?.message, data: { err } });
    }

    const payload = createJwtPayload(user._doc);

    try {
      logger.info('Generating jwt token (signupController)', { userId: user._id });
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

      logger.info('User is logged in successfully (signupController)', { userId: user._id });
      return res.status(statusCodes.createdSuccessfully).json({ success: 1, message: globalConstants.responseMessages.signUpUser.success, token, data: { ...user._doc } });
    } catch (err) {
      logger.error('Error in generating JWT token (signupController)', { error: err });
      return res.status(statusCodes.internalError).json({ success: 0, message: globalConstants.responseMessages.signUpUser.failure, data: { err } });
    }
  })(req, res);
};

/**
 * Created logout controller to log out user
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
 */
const logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      logger.error('Error in req.logout() (logoutController)', { req: req, error: err });
      return res.status(statusCodes.internalError).json({ success: 0, message: authConstants.responseMessages.logOutUser.failure, data: null });
    }

    logger.info('User is logged out successfully');
    return res.status(statusCodes.success).json({ success: 1, message: authConstants.responseMessages.logOutUser.success, data: null });
  });
};

/**
 * Created controller to change password
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const changePassword = async (req, res) => {
  logger.info('Changing user password (changePasswrodController)');

  if (!req.user) {
    logger.error('User is not found in request. login() problem. (changePasswrodController)', { req: req });
    return res.status(statusCodes.unAuthorized).json({ success: 0, message: authConstants.responseMessages.authorizedUser.failure, data: null });
  }

  const password = req.body.password;
  const newPassword = req.body.newPassword;
  const [err, user] = await to(User.findById({ _id: req.user._id }));

  if (err) {
    logger.error('Got an error while finding user to change his password (changePasswordController)', { error: err, userId: req.user._id });
    return res.status(statusCodes.internalError).json({ success: 0, message: authConstants.responseMessages.changePassword.failure, data: null });
  } else if (!user) {
    logger.error('Could not found the user is db from req.user._id (changePasswordController)', { userId: req.user._id });
    return res.status(statusCodes.notFound).json({ success: 0, message: authConstants.responseMessages.changePassword.wrongCredentails, data: null });
  }

  if (user.password) {
    if (!(await user.isPasswordMatched(password))) {
      logger.info('Wrong old passwrod provided by user (changePasswordController)', { userId: req.user._id });
      return res.status(statusCodes.unAuthorized).json({ success: 0, message: authConstants.responseMessages.changePassword.wrongCredentails, data: null });
    }
  } else {
    logger.info('User is logged in through google/github and trying to change password (changePasswordController)', { userId: req.user._id });
    return res.status(statusCodes.conflict).json({ success: 0, message: authConstants.responseMessages.changePassword.conflict, data: null });
  }

  logger.info('Started saving new password in db', { userId: req.user._id });

  user.password = newPassword;
  const [passwordSavingErr, passwordSaved] = await to(user.save());

  if (passwordSavingErr) {
    logger.error('Error in saving user new password (changePasswordController)', { error: passwordSavingErr, userId: req.user._id });
    return res.status(statusCodes.internalError).json({ success: 0, message: authConstants.responseMessages.changePassword.failure, data: null });
  } else if (passwordSaved) {
    logger.info('New password is saved successfully (changePasswordController)', { userId: req.user._id });
    return res.status(statusCodes.success).json({ success: 1, message: authConstants.responseMessages.changePassword.success, data: user });
  }

  return res.status(statusCodes.internalError).json({ success: 0, message: authConstants.responseMessages.changePassword.failure, data: null });
};

/**
 * Created controller to handle forgot password. It simply mails the user with new password and link to update it
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
*/
const forgotPassword = async (req, res) => {
  logger.info('Started working on forgot password', { userEmail: req.body.email });

  const [err, user] = await to(User.findOne({ email: req.body.email }));

  if (err) {
    logger.error('Error in finding user through email (forgotPasswordController)', { error: err, userEmail: req.body.email });
    return res.status(statusCodes.internalError).json({ success: 0, message: authConstants.responseMessages.generalErrorMessage, data: null });
  } else if (!user) {
    logger.info('User provided wrong email', { providedEmail: req.body.email });
    return res.status(statusCodes.notFound).json({ success: 0, message: authConstants.responseMessages.forgotPassword.wrongCredentails, data: null });
  }

  const [tokenGeneratingError, token] = await to(user.generatePasswordResetToken());

  if (tokenGeneratingError) {
    logger.error('Error in generating token (forgotPasswordController)', { error: tokenGeneratingError, userId: user._id });
    return res.status(statusCodes.internalError).json({ success: 0, message: authConstants.responseMessages.generalErrorMessage, data: null });
  }

  const [tokenSavingErr, savedToken] = await to(user.save());

  if (tokenSavingErr) {
    logger.error('Error in saving generated token in db (forgotPasswordController)', { error: tokenSavingErr, userId: user._id });
    return res.status(statusCodes.internalError).json({ success: 0, message: authConstants.responseMessages.generalErrorMessage, data: null });
  } else if (!savedToken) {
    logger.error('Unknown error in saving token in db (forgotPasswordController)', { userId: user._id });
    return res.status(statusCodes.internalError).json({ success: 0, message: authConstants.responseMessages.generalErrorMessage, data: null });
  }

  logger.info('Token is saved in db successfully (forgotPasswordController)', { user: user._id });

  const [emailTransportErr, info] = await to(sendPasswordResetMail(token, req.body.email));

  if (emailTransportErr) {
    logger.error('Error in sending password reset mail to the user (forgotPasswordController)', { error: emailTransportErr, user: user._id });
    return res.status(statusCodes.internalError).json({ success: 0, message: authConstants.responseMessages.forgotPassword.resetPasswordEmail.failure, data: null });
  } else if (info.accepted[0] === req.body.email) {
    logger.info('Password reset mail is sent to the user (forgotPasswordController)', { user: user._id });
    return res.status(statusCodes.success).json({ success: 1, message: authConstants.responseMessages.forgotPassword.resetPasswordEmail.success, data: null });
  } else {
    logger.error('No Error in sending password reset mail to the user but email trasporter response does not have user email as accepted emails (forgotPasswordController)', { errorEmailInfo: info, user: user._id });
    return res.status(statusCodes.internalError).json({ success: 0, message: authConstants.responseMessages.forgotPassword.resetPasswordEmail.failure, data: null });
  }
};

/**
 * Created controller to actually update the password. Its route is sent by the mail for secure password change
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
*/
const resetPassword = async (req, res) => {
  logger.info('Started resetting the password for user (resetPasswordController)');

  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const [err, user] = await to(User.findById(decoded.id));

  if (!user || err) {
    logger.error('Error in finding user through token in param (resetPasswordController)', { error: err }, { jwtDecoded: decoded }, { params: req.params });
    return res.status(statusCodes.internalError).send(authConstants.responseMessages.generalErrorMessage);
  } else if (user.passwordResetToken !== token) {
    logger.error('token in param and the one in db does not match (resetPasswordController)');
    return res.status(statusCodes.conflict).send(authConstants.responseMessages.resetPassword.tokenExpiredMessage);
  };

  user.password = token.slice(token.length-10) + '123#';
  user.passwordResetToken = undefined;
  const [userSavingErr, savedUser] = await to(user.save());

  if (userSavingErr || !savedUser) {
    logger.error('Error in saving reset password in db (resetPasswordController)', { error: userSavingErr }, { userId: user._id });
    return res.status(statusCodes.internalError).send({ success: 0, message: authConstants.responseMessages.resetPassword.failure, data: userSavingErr });
  } else {
    logger.info('Reset password is saved in db successfully (resetPasswordController)', { userId: savedUser._id });
    return res.status(statusCodes.success).send(authConstants.responseMessages.resetPassword.success);
  }
};

/**
 * Created controller to get the complete user data form db
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const getProfileData = async (req, res) => {
  logger.info('Started getting the user profile data (getProfileDataController)');

  const user = req.user;
  if (!user) {
    logger.error('User is not found in req. login Problem. (getProfileDataController)', { req: req });
    return res.status(statusCodes.unAuthorized).json({ success: 0, message: authConstants.responseMessages.authorizedUser.failure, data: null });
  }

  logger.info('User is not found in req. login Problem. (getProfileDataController)', { userId: user._id });
  return res.status(statusCodes.success).send({ success: 1, message: authConstants.responseMessages.userProfileData.success, data: user });
};

/**
 * Created controller to update the profile information
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const updateProfile = async (req, res) => {
  logger.info('Started updating user profile data (updateProfileController)');

  const user = req.user;
  if (!user) {
    logger.error('No user found in req. login Problem. (updateProfileController)', { req: req });
    return res.status(statusCodes.unAuthorized).json({ success: 0, message: authConstants.responseMessages.authorizedUser.failure, data: null });
  }

  const profileData = { ...req.body };

  if (user.googleId || user.githubId) {
    delete profileData.email;
  }

  const [updatingUserErr, updatedUser]= await to(User.findByIdAndUpdate(user._id, { ...profileData }, { new: true }));

  if (updatingUserErr) {
    logger.error('Error in updating user profile data (updateProfileController)', { error: updatingUserErr, userId: user._id });
    return res.status(statusCodes.internalError).send({ success: 0, message: authConstants.responseMessages.updateUserProfile.failure, data: updatingUserErr });
  } else if (updatedUser) {
    logger.info('Updated user profile data (updateProfileController)', { userId: updatedUser._id });
    return res.status(statusCodes.success).send({ success: 1, message: authConstants.responseMessages.updateUserProfile.success, data: updatedUser });
  } else {
    logger.error('Error in updating user profile data (updateProfileController)', { updatedUser: updatedUser }, { updatingUserError: updatingUserErr });
    return res.status(statusCodes.internalError).send({ success: 0, message: authConstants.responseMessages.updateUserProfile.failure, data: null });
  }
};

/**
 * Created controller to login/signup usign google account
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const googleAuth = async (req, res) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      logger.error('Passport google strategy returned error (googleController)', { error: err }, { info: info }, { user: user });
      return res.status(statusCodes.internalError).json({ success: 0, message: info?.message, data: { err } });
    }

    if (!user) {
      logger.error('Passport google strategy did not return user (googleController)', { error: err }, { info: info });
      return res.status(statusCodes.internalError).json({ success: 0, message: info?.message, data: { err } });
    }

    const payload = createJwtPayload(user._doc);

    try {
      logger.info('Generating jwt token (googleController)', { userId: user._id });
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

      logger.info('User is logged in through google successfully (googleController)', { userId: user._id });
      return res.status(statusCodes.success).json({ success: 1, message: globalConstants.responseMessages.logInUser.socialLogin.success, token, data: { ...user._doc } });
    } catch (err) {
      logger.error('Error in generating JWT token (googleController)', { error: err });
      return res.status(statusCodes.internalError).json({ success: 0, message: globalConstants.responseMessages.logInUser.socialLogin.failure, data: { err } });
    }
  })(req, res);
};

/**
 * Created controller to login/signup usign github account
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
*/
const githubAuth = async (req, res) => {
  passport.authenticate('github', (err, user, info) => {
    if (err) {
      logger.error('Passport github strategy returned error (githubController)', { error: err }, { info: info }, { user: user });
      return res.status(statusCodes.internalError).json({ success: 0, message: info?.message, data: { err } });
    }

    if (!user) {
      logger.error('Passport github strategy did not return user (githubController)', { error: err }, { info: info });
      return res.status(statusCodes.internalError).json({ success: 0, message: info?.message, data: { err } });
    }

    const payload = createJwtPayload(user._doc);

    try {
      logger.info('Generating jwt token (githubController)', { userId: user._id });
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

      logger.info('User is logged in through github successfully (githubController)', { userId: user._id });
      return res.status(statusCodes.success).json({ success: 1, message: globalConstants.responseMessages.logInUser.socialLogin.success, token, data: { ...user._doc } });
    } catch (err) {
      logger.error('Error in generating JWT token (githubController)', { error: err });
      return res.status(statusCodes.internalError).json({ success: 0, message: globalConstants.responseMessages.logInUser.socialLogin.failure, data: { err } });
    }
  })(req, res);
};

module.exports = { login, signup, forgotPassword, changePassword, logout, resetPassword, getProfileData, updateProfile, googleAuth, githubAuth };
