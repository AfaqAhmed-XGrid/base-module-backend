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
const express = require('express');
const passport = require('passport');
const { body, query, validationResult } = require('express-validator');

// Controller imports
const authController = require('./auth.controller');

// Middlware imports
const commonMiddleware = require('../../common/commonMiddleware');
const authMiddleware = require('./auth.middleware');

// Creating instance
const router = express.Router();

// api endpoint to login user
router.post(
    '/login',
    authMiddleware.validateLogIn,
    commonMiddleware.validationError,
    authController.login,
);

// api endpoint to signup user
router.post(
    '/signup',
    authMiddleware.validateSignUp,
    commonMiddleware.validationError,
    authController.signup,
);

// api endpoint to logout user
router.get(
    '/logout',
    authController.logout,
);

// api endpoint to change user password
router.put(
    '/change-password',
    authMiddleware.validateChangePassword,
    commonMiddleware.validationError,
    authMiddleware.isAuthenticated,
    authController.changePassword,
);

// api endpoint to forgot password. It send the reset mail to the user
router.post(
    '/forgot-password',
    authMiddleware.validateForgotPassword,
    commonMiddleware.validationError,
    authController.forgotPassword,
);

// api endpoint to reset the user password
router.get(
    '/reset-password/:token',
    authMiddleware.validateResetPassword,
    commonMiddleware.validationError,
    authController.resetPassword,
);

// api endpoint to get the user data
router.get(
    '/user',
    authMiddleware.isAuthenticated,
    authController.getProfileData,
);

// api endpoint to update the user data
router.put(
    '/update-profile',
    authMiddleware.isAuthenticated,
    authMiddleware.validateUpdateProfile,
    commonMiddleware.validationError,
    authController.updateProfile,
);

// api endpoint to login/signup user through github
router.get(
    '/github',
    passport.authenticate('github', { scope: ['profile'] }),
);

// api endpoint to callback url for passport github auth
router.get(
    '/github/callback',
    authController.githubAuth,
);

// api endpoint to login/signup user through google
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile'] }),
);

// api endpoint to callback url for passport google auth
router.get('/google/callback',
    authController.googleAuth,
);

module.exports = router;
