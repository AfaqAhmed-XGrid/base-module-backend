// Package imports
const passport = require('passport');

// Constant imports
const authConstants = require('./auth.constants');
const globalConstants = require('../../constants/constants.js');

// Logger import
const logger = require('../../config/logger/logger');

/**
 * Created middleware to check if the user is loggedin and then allow him to the route
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
 * @return {callback}
 */
const isAuthenticated = (req, res, next) => {
  logger.info('Authenticating user with isAuthenticated middleware');

  if (req.isAuthenticated()) {
    logger.info('User is authenticated (isAuthenticatedMiddleware)', { userId: req.user._id });
    return next();
  }

  logger.info('User is not authenticated', { req: req });
  res.status(401).json({ success: 0, message: authConstants.responseMessages.authorizedUser.failure, data: null });
};

/**
 * Created login middleware to integrate passport-local with login strategy
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
*/
const login = (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      logger.error('Passport login Strategy returned error (loginMiddlware)', { error: err }, { info: info }, { user: user });
      return res.status(409).json({ success: 0, message: info?.message, data: { err } });
    }

    if (!user) {
      logger.error('passport login Strategy did not return the user (loginMiddlware)', { error: err }, { info: info });
      return res.status(409).json({ success: 0, message: info?.message, data: { err } });
    }

    req.logIn(user, function(err) {
      if (err) {
        logger.error('Error in req.logIn(user) (loginMiddlware)', { error: err });
        return res.status(409).json({ success: 0, message: globalConstants.responseMessages.logInUser.failure, data: { err } });
      }
      logger.info('Req.login() is successful in login middleware with login strategy (loginMiddlware)', { user: req.user });
      next();
    });
  })(req, res, next);
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
 */
const signup = (req, res, next) => {
  passport.authenticate('signup', (err, user, info) => {
    if (err) {
      logger.error('Passport signup strategy returned error (signupMiddleware)', { error: err }, { info: info }, { user: user });
      return res.status(409).json({ success: 0, message: info?.message, data: { err } });
    }

    if (!user) {
      logger.error('Passport signup strategy did not return user (signupMiddleware)', { error: err }, { info: info });
      return res.status(409).json({ success: 0, message: info?.message, data: { err } });
    }

    req.logIn(user, function(err) {
      if (err) {
        logger.error('Error in req.logIn() (signupMiddleware)', { error: err });
        return res.status(409).json({ success: 0, message: globalConstants.responseMessages.signUpUser.failure, data: { err } });
      }
      next();
    });
  })(req, res, next);
};

/**
 * Created login middleware to integrate passport-google with google strategy
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
 */
const google = (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      logger.error('Passport google strategy returned error (googleMiddleware)', { error: err }, { info: info }, { user: user });
      return res.status(409).json({ success: 0, message: info?.message, data: { err } });
    }

    if (!user) {
      logger.error('Passport google strategy did not return user (googleMiddleware)', { error: err }, { info: info });
      return res.status(409).json({ success: 0, message: info?.message, data: { err } });
    }

    req.logIn(user, function(err) {
      if (err) {
        logger.error('Error in req.logIn() (googleMiddleware)', { error: err });
        return res.status(409).json({ success: 0, message: globalConstants.responseMessages.logInUser.socialLogin.failure, data: { err } });
      }
      logger.info('req.login() is suuccessful in google middlware with google strategy', { user: req.user });
      next();
    });
  })(req, res, next);
};

/**
 * Created login middleware to integrate passport-github with github strategy
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
*/
const github = (req, res, next) => {
  passport.authenticate('github', (err, user, info) => {
    if (err) {
      logger.error('Passport github strategy returned error (githubMiddleware)', { error: err }, { info: info }, { user: user });
      return res.status(409).json({ success: 0, message: info?.message, data: { err } });
    }

    if (!user) {
      logger.error('Passport github strategy did not return user (githubMiddleware)', { error: err }, { info: info });
      return res.status(409).json({ success: 0, message: info?.message, data: { err } });
    }

    req.logIn(user, function(err) {
      if (err) {
        logger.error('Error in req.logIn() (githubMiddleware)', { error: err });
        return res.status(409).json({ success: 0, message: globalConstants.responseMessages.logInUser.failure, data: { err } });
      }
      logger.info('req.login() is suuccessful in github middlware with github strategy', { user: req.user });
      next();
    });
  })(req, res, next);
};


const logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      logger.error('Error in req.logout() (logoutMiddleware)', { req: req, error: err });
      return res.status(406).json({ success: 0, message: authConstants.responseMessages.logOutUser.failure, data: null });
    }
    logger.info('User is logged out successfully');
    next();
  });
};

module.exports = { isAuthenticated, login, signup, google, github, logout };
