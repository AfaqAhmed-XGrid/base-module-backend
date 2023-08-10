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
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

// Constant imports
const statusCodes = require('../constants/statusCodes');
const globalConstants = require('../constants/constants');

// Logger import
const logger = require('../config/logger/logger');

/**
 * Function to handle validation error
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @return {Object}
 */
const validationError = (req, res, next) => {
  const result = validationResult(req).formatWith(({ msg, path }) => ({ msg, path }));
  if (result.isEmpty()) {
    return next();
  }
  res.status(statusCodes.badRequest).send({ success: 0, message: result.array() });
};

/**
 * Middleware function to check if user is loggedin or not
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @return {Object}
 */
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    logger.info('User is trying to make request without token in header', { header: req.headers });
    return res.status(statusCodes.unAuthorized).json({ success: 0, message: globalConstants.responseMessages.authorizedUser.failure, data: null });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.info('Error in verifying jwt token', { err: err });
      return res.status(statusCodes.unAuthorized).json({ success: 0, message: globalConstants.responseMessages.authorizedUser.failure, data: null });
    }

    if (!decoded) {
      logger.info('Empty jwt decoded', { decoded: decoded });
      return res.status(statusCodes.unAuthorized).json({ success: 0, message: globalConstants.responseMessages.authorizedUser.failure, data: null });
    }

    logger.info('User is authenticated (isAuthenticatedMiddleware)', { userId: decoded._id });
    req.user = decoded;
    return next();
  });
};

module.exports = { validationError, isAuthenticated };
