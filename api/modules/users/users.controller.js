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
const { default: to } = require('await-to-js');

// Constant Imports
const usersConstants = require('./users.constants');
const statusCodes = require('../../constants/statusCodes');

// Model imports
const User = require('../auth/auth.model');

// Logger import
const logger = require('../../config/logger/logger');

// Helper Functions import
const {
  signInMethodFilteration,
  constructPagination,
  searchFilteration,
} = require('./users.helper');

/**
 * Controller Function to get all users data
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<Object>}
 */
const getAllUsers = async (req, res) => {
  logger.info('Started getting all users data');

  // Signin Method wise Filteration
  const methodFilteration = signInMethodFilteration(req);

  // Pagination
  const { limit, skip, pageNo } = constructPagination(req);

  // Searching
  const searchFilter = searchFilteration(req);

  const [err, users] = await to(
      User.aggregate([
        methodFilteration,
        searchFilter,
        {
          $facet: {
            users: [
              { $skip: skip },
              { $limit: limit },
              {
                $project: {
                  githubId: 0,
                  googleId: 0,
                  __v: 0,
                },
              },
            ],
            totalCount: [{ $group: { _id: null, count: { $sum: 1 } } }],
          },
        },
        {
          $project: {
            users: 1,
            usersCount: { $arrayElemAt: ['$totalCount.count', 0] },
            totalPages: {
              $ceil: {
                $divide: [{ $arrayElemAt: ['$totalCount.count', 0] }, limit],
              },
            },
            currentPage: pageNo,
          },
        },
      ]),
  );

  if (err) {
    logger.error('Could not get users data', { error: err });
    return res.status(statusCodes.internalError).json({
      success: 0,
      message: usersConstants.responseMessages.getAllUsers.failure,
      data: null,
    });
  }

  return res.status(statusCodes.success).json({
    success: 1,
    message: usersConstants.responseMessages.getAllUsers.success,
    data: users,
  });
};

/**
 * Controller function to get single user from db
 * @param {Object} req
 * @param {Object} res
 * @return {Promse<Object>}
 */
const getSingleUser = async (req, res) => {
  const id = req.params;

  if (!id) {
    return res.status(statusCodes.badRequest).json({
      success: 0,
      message: usersConstants.responseMessages.getSingleUser.noId,
      data: null,
    });
  }

  logger.info('Getting single user data with id: ', { id: id });

  const [err, user] = await to(User.findById(id));

  if (err) {
    logger.error('Could not get user data', { error: err });
    return res.status(statusCodes.internalError).json({
      success: 0,
      message: usersConstants.responseMessages.getSingleUser.failure,
      data: null,
    });
  }

  return res.status(statusCodes.success).json({
    success: 1,
    message: usersConstants.responseMessages.getSingleUser.success,
    data: user,
  });
};

/**
 * Controller function to delete user from db
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(statusCodes.badRequest).json({
      success: 0,
      message: usersConstants.responseMessages.deleteUser.noId,
      data: null,
    });
  }

  logger.info('Deleting single user with id: ', { id: id });

  const [err, user] = await to(User.findByIdAndDelete(id));

  if (err) {
    logger.error('Could not delete user', { error: err }, { userId: id });
    return res.status(statusCodes.internalError).json({
      success: 0,
      message: usersConstants.responseMessages.deleteUser.failure,
      data: null,
    });
  }

  return res.status(statusCodes.success).json({
    success: 1,
    message: usersConstants.responseMessages.deleteUser.success,
    data: user,
  });
};

module.exports = { getAllUsers, getSingleUser, deleteUser, editUser };
