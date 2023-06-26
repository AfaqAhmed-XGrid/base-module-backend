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
  logger.info(authConstants.labels.sessiodId, req.sessionID);
  logger.info(authConstants.labels.session, req.session);
  logger.info(authConstants.labels.user, req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  logger.error(authConstants.labels.iaAuthenticatedMiddleware.false, req);
  res.status(401).json({success: 0, message: authConstants.responseMessages.authorizedUser.failure, data: null});
};

/**
 * Created login middleware to integrate passport-local with login strategy
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
 * @return {callback}
*/
const loginMiddleware = (req, res, next) => {
  try {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        logger.error(authConstants.labels.loginMiddleware.strategyError, err, info);
        return res.status(409).json({success: 0, message: info?.message, data: {err}});
      }

      if (!user) {
        logger.error(authConstants.labels.loginMiddleware.noUserStrategyError, err, info);
        return res.status(409).json({success: 0, message: info?.message, data: {err}});
      }

      req.logIn(user, function(err) {
        if (err) {
          logger.error(authConstants.labels.loginMiddleware.loginError, err);
          return res.status(409).json({success: 0, message: globalConstants.responseMessages.logInUser.failure, data: {err}});
        }
        logger.info(authConstants.labels.middleware, req.user);
        next();
      });
    })(req, res, next);
  } catch (error) {
    logger.info(globalConstants.labels.logIn, error);
    return res.status(500).json({success: 0, message: globalConstants.responseMessages.logInUser.failure, error: error.message});
  }
};

/**
 * Created signup middleware to integrate passport-local with signup strategy
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
 * @return {callback}
 */
const signupMiddleware = (req, res, next) => {
  try {
    passport.authenticate('signup', (err, user, info) => {
      if (err) {
        logger.error(authConstants.labels.signupMiddleware.strategyError, err, info);
        return res.status(409).json({success: 0, message: info?.message, data: {err}});
      }

      if (!user) {
        logger.error(authConstants.labels.signupMiddleware.noUserStrategyError, err, info, user);
        return res.status(409).json({success: 0, message: info?.message, data: {err}});
      }

      req.logIn(user, function(err) {
        if (err) {
          logger.error(authConstants.labels.signupMiddleware.loginError, err);
          return res.status(409).json({success: 0, message: globalConstants.responseMessages.signUpUser.failure, data: {err}});
        }
        next();
      });
    })(req, res, next);
  } catch (error) {
    logger.info(globalConstants.labels.signUp, error);
    return res.status(500).json({success: 0, message: globalConstants.responseMessages.signUpUser.failure, error: error.message});
  }
};

/**
 * Created login middleware to integrate passport-google with google strategy
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
 */
const googleMiddleware = (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      logger.error(authConstants.labels.googleMiddleware.strategyError, err, info);
      return res.status(409).json({success: 0, message: info?.message, data: {err}});
    }

    if (!user) {
      logger.error(authConstants.labels.googleMiddleware.noUserStrategyError, err, info, user);
      return res.status(409).json({success: 0, message: info?.message, data: {err}});
    }

    req.logIn(user, function(err) {
      if (err) {
        logger.error(authConstants.labels.googleMiddleware.loginError, err);
        return res.status(409).json({success: 0, message: globalConstants.responseMessages.logInUser.socialLogin.failure, data: {err}});
      }
      logger.info(authConstants.labels.middleware, req.user);
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
const githubMiddleware = (req, res, next) => {
  passport.authenticate('github', (err, user, info) => {
    logger.info(authConstants.labels.error, err);

    if (err) {
      logger.error(authConstants.labels.githubMiddleware.strategyError, err, info);
      return res.status(409).json({success: 0, message: info?.message, data: {err}});
    }

    if (!user) {
      logger.error(authConstants.labels.githubMiddleware.noUserStrategyError, err, info, user);
      return res.status(409).json({success: 0, message: info?.message, data: {err}});
    }

    req.logIn(user, function(err) {
      if (err) {
        logger.error(authConstants.labels.githubMiddleware.loginError, err);
        return res.status(409).json({success: 0, message: globalConstants.responseMessages.logInUser.failure, data: {err}});
      }
      next();
    });
  })(req, res, next);
};

module.exports = {isAuthenticated, loginMiddleware, signupMiddleware, googleMiddleware, githubMiddleware};
