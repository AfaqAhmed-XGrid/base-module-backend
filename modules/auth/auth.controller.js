// Package imports
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

// Constant Imports
const User = require('./auth.model');
const constants = require('./auth.constants');

/**
 * Created login controller to send response to the user on login
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const loginCtrl = async (req, res) => {
  try {
    return res.status(200).json({success: 1, message: constants.LOGGED_IN_MSG, data: req.user});
  } catch (error) {
    console.log(constants.LOGIN_CATCH_ERROR_MSG, error);
    return res.status(500).json({success: 0, message: constants.FAILED_LOGGED_IN_MSG, error: error.message});
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
  try {
    return res.status(200).json({success: 1, message: constants.SIGN_UP_MSG, data: req.user});
  } catch (error) {
    console.log(constants.SIGNUP_CATCH_ERROR_MSG, error);
    return res.status(500).json({success: 0, message: constants.FAILED_SIGN_UP_MSG, error: error.message});
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
      return res.json({success: 0, message: constants.FAILED_LOG_OUT_MSG, data: err});
    }
    return res.json({success: 1, message: constants.LOG_OUT_MSG, data: null});
  });
};

/**
 * Created controller to change password
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const changePasswordCtrl = async (req, res) => {
  try {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const user = await User.findById({_id: req.user._id});

    if (!user) {
      return res.status(406).json({success: 0, message: constants.ERROR_MSG, data: null});
    }

    if ((user.githubId || user.googleId) && user.password) {
      if (!(await user.isPasswordMatched(password))) {
        return res.status(406).json({success: 0, message: constants.WRONG_OLD_PASS, data: null});
      }
    }

    if (user.password) {
      if (!(await user.isPasswordMatched(password))) {
        return res.status(406).json({success: 0, message: constants.WRONG_OLD_PASS, data: null});
      }
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({success: 1, message: constants.PASS_CHANGED_MSG, data: user});
  } catch (error) {
    return res.status(501).json({success: 0, message: constants.ERROR_MSG, data: null});
  }
};

/**
 * Created controller to handle forgot password. It simply mails the user with new password and link to update it
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const forgotPasswordCtrl = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return res.status(404).json({success: 0, message: constants.WRONG_EMAIL, data: null});
    }

    const token = await user.generatePasswordResetToken();
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: rocess.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `${process.env.EMAIL_FROM} <process.env.EMAIL_USER>`,
      to: req.body.email,
      subject: constants.PASS_RESET_EMAIL_SUBJECT,
      text: constants.PASS_RESET_EMAIL_TEXT,
      html: `<a href="http://localhost:4000/api/auth/local-resetpassword/${token}" target="_blank">Reset my password</a>
      <h2>Your new password would be the following</h2>
      <b style='text-align:center; color:blue'>${token.slice(0, 10)}</b>
      <br />
      <p>Please change it soon after logging in✨✨</p>`,
    });

    if (info.accepted[0] === req.body.email) {
      return res.status(200).json({success: 1, message: constants.PASS_EMAIL_SENT, data: null});
    } else {
      return res.status(500).json({success: 0, message: constants.PASS_EMAIL_FAIL, data: null});
    }
  } catch (error) {
    return res.status(409).json({success: 0, message: constants.PASS_EMAIL_FAIL, data: error});
  }
};

/**
 * Created controller to actually update the password. Its route is sent by the mail for secure password change
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const resetPasswordCtrl = async (req, res) => {
  try {
    const {token} = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(409).send(constants.PASS_RESET_FAIL);

    if (user.passwordResetToken !== token) return res.status(404).send(constants.PASS_TOKEN_EXPIRED);

    user.password = token.slice(0, 10);
    user.passwordResetToken = undefined;
    await user.save();

    return res.status(200).send(constants.PASS_REST_MSG);
  } catch (error) {
    return res.status(409).send({success: 0, message: constants.PASS_RESET_FAIL, data: error});
  }
};

/**
 * Created controller to get the complete user data form db
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const getProfileData = async (req, res) => {
  try {
    const user = req.user;

    if (user) {
      return res.status(200).send({success: 1, message: constants.PROFILE_FETCHED, data: user});
    } else {
      return res.status(404).send({success: 0, message: constants.PROFILE_DATA_ERROR, data: error});
    }
  } catch (error) {
    return res.status(409).send({success: 0, message: constants.PROFILE_DATA_ERROR, data: error});
  }
};

/**
 * Created controller to update the profile information
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const updateProfileCtrl = async (req, res) => {
  try {
    const user = req.user;
    const updatedUser = await User.findByIdAndUpdate(user._id, {...req.body}, {new: true});

    if (updatedUser) {
      return res.status(200).send({success: 1, message: constants.PROFILE_UPDATED, data: updatedUser});
    } else {
      return res.status(501).send({success: 0, message: constants.PROFILE_UPDATED_FAIL, data: error});
    }
  } catch (error) {
    return res.status(409).send({success: 0, message: constants.PROFILE_UPDATED_FAIL, data: error});
  }
};

/**
 * Created controller to login/signup usign google account
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const googleCtrl = async (req, res) => {
  try {
    return res.status(200).send(constants.THIRD_PARTY_LOGIN_SUCCESS);
  } catch (error) {
    console.log('catch error: ', error);
    return res.status(500).json({success: 0, message: constants.FAILED_LOGGED_IN_MSG, error: error.message});
  }
};

/**
 * Created controller to login/signup usign github account
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const githubCtrl = async (req, res) => {
  try {
    return res.status(200).send(constants.THIRD_PARTY_LOGIN_SUCCESS);
  } catch (error) {
    console.log('catch error: ', error);
    return res.status(500).json({success: 0, message: constants.FAILED_LOGGED_IN_MSG, error: error.message});
  }
};

module.exports = {loginCtrl, signupCtrl, forgotPasswordCtrl, changePasswordCtrl, logoutCtrl, resetPasswordCtrl, getProfileData, updateProfileCtrl, googleCtrl, githubCtrl};
