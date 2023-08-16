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

// Import packages
const express = require('express');

// Import controller
const usersController = require('./users.controller');

// Import middleware
const commonMiddleware = require('../../common/commonMiddleware');
const usersMiddleware = require('./users.middleware');

// Creating instance
const router = express.Router();

// api endpoint to get all users data
router.get(
    '/all-users',
    usersMiddleware.validateGetAllUsers,
    commonMiddleware.validationError,
    usersController.getAllUsers,
);

// api endpoint to get all users data
router.get(
    '/user/:id',
    usersMiddleware.validateIdParam,
    commonMiddleware.validationError,
    usersController.getSingleUser,
);

// api endpoint to delete user
router.delete(
    '/user/:id',
    usersMiddleware.validateIdParam,
    commonMiddleware.validationError,
    usersController.deleteUser,
);

module.exports = router;
