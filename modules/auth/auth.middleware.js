// Package imports
const passport = require('passport');

// Constant imports
const constants = require('./auth.constants.js');

/**
 * Created middleware to check if the user is loggedin and then allow him to the route
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
 * @return {callback}
 */
const isAuthenticated = (req, res, next) => {
  console.log(constants.SESSION_ID, req.sessionID);
  console.log(constants.SESSION, req.session);
  console.log(constants.USER, req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({success: 0, message: constants.NOT_AUTHORIZED_MSG, data: null});
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
      console.log(constants.ERROR, err);
      console.log(constants.USER, user);
      console.log(constants.INFO, info);

      if (err) {
        return res.status(409).json({success: 0, message: info?.message, data: {err}});
      }

      if (!user) {
        return res.status(409).json({success: 0, message: info?.message, data: {err}});
      }

      req.logIn(user, function(err) {
        if (err) {
          return res.status(409).json({success: 0, message: constants.FAILED_LOGGED_IN_MSG, data: {err}});
        }
        console.log(constants.MIDDLE_WARE, req.user);
        next();
      });
    })(req, res, next);
  } catch (error) {
    console.log(constants.LOGIN_CATCH_ERROR_MSG, error);
    return res.status(500).json({success: 0, message: constants.FAILED_LOGGED_IN_MSG, error: error.message});
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
      console.log(constants.ERROR, err);
      console.log(constants.USER, user);
      console.log(constants.INFO, info);

      if (err) {
        return res.status(409).json({success: 0, message: info?.message, data: {err}});
      }

      if (!user) {
        return res.status(409).json({success: 0, message: info?.message, data: {err}});
      }

      req.logIn(user, function(err) {
        if (err) {
          return res.status(409).json({success: 0, message: constants.FAILED_SIGN_UP_MSG, data: {err}});
        }
        next();
      });
    })(req, res, next);
  } catch (error) {
    console.log(constants.SIGNUP_CATCH_ERROR_MSG, error);
    return res.status(500).json({success: 0, message: constants.FAILED_SIGN_UP_MSG, error: error.message});
  }
};

/**
 * Created login middleware to integrate passport-google with google strategy
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
 * @return {callback}
 */
const googleMiddleware = (req, res, next) => {
  try {
    passport.authenticate('google', (err, user, info) => {
      console.log(constants.ERROR, err);
      console.log(constants.USER, user);
      console.log(constants.INFO, info);

      if (err) {
        return res.status(409).json({success: 0, message: info?.message, data: {err}});
      }

      if (!user) {
        return res.status(409).json({success: 0, message: info?.message, data: {err}});
      }

      req.logIn(user, function(err) {
        if (err) {
          return res.status(409).json({success: 0, message: constants.FAILED_LOGGED_IN_MSG, data: {err}});
        }
        console.log(constants.MIDDLE_WARE, req.user);
        next();
      });
    })(req, res, next);
  } catch (error) {
    console.log('03');
    console.log(constants.LOGIN_CATCH_ERROR_MSG, error);
    return res.status(500).json({success: 0, message: constants.FAILED_LOGGED_IN_MSG, error: error.message});
  }
};

/**
 * Created login middleware to integrate passport-github with github strategy
 * @param {Object} req
 * @param {Object} res
 * @param {callback} next
 * @return {callback}
 */
const githubMiddleware = (req, res, next) => {
  try {
    passport.authenticate('github', (err, user, info) => {
      console.log(constants.ERROR, err);
      console.log(constants.USER, user);
      console.log(constants.INFO, info);

      if (err) {
        return res.status(409).json({success: 0, message: info?.message, data: {err}});
      }

      if (!user) {
        return res.status(409).json({success: 0, message: info?.message, data: {err}});
      }

      req.logIn(user, function(err) {
        if (err) {
          return res.status(409).json({success: 0, message: constants.FAILED_LOGGED_IN_MSG, data: {err}});
        }
        console.log(constants.MIDDLE_WARE, req.user);
        next();
      });
    })(req, res, next);
  } catch (error) {
    console.log(constants.LOGIN_CATCH_ERROR_MSG, error);
    return res.status(500).json({success: 0, message: constants.FAILED_LOGGED_IN_MSG, error: error.message});
  }
};

module.exports = {isAuthenticated, loginMiddleware, signupMiddleware, googleMiddleware, githubMiddleware};
