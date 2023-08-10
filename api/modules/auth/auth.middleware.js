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
const { body, param } = require('express-validator');

module.exports = {
  validateLogIn: [
    body('email').isEmail().withMessage('Email is requried with correct format'),
    body('password').notEmpty().withMessage('Password is requried'),
  ],
  validateSignUp: [
    body('email').isEmail().withMessage('Email is requried with correct format'),
    body('password').isStrongPassword().withMessage('Password is requried with correct format'),
    body('displayName').notEmpty().withMessage('Display name is requried'),
  ],
  validateChangePassword: [
    body('password').isStrongPassword().withMessage('Password is requried with correct format'),
    body('newPassword').isStrongPassword().withMessage('New Password is requried with correct format'),
  ],
  validateForgotPassword: [
    body('email').isEmail().withMessage('Email is requried with correct format'),
  ],
  validateResetPassword: [
    param('token').notEmpty().withMessage('Token is required'),
  ],
  validateUpdateProfile: [
    body('email').optional().isEmail().withMessage('Email is requried with correct format'),
    body('displayName').optional().notEmpty().withMessage('Display name is required'),
  ],
};
