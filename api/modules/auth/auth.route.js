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

// constant imports
const authController = require('./auth.controller');
const authMiddleware = require('./auth.middleware');

// Creating instance
const router = express.Router();

// api endpoint to login user
router.post(
    '/login',
    authMiddleware.login,
    authController.login,
);

// api endpoint to signup user
router.post(
    '/signup',
    authMiddleware.signup,
    authController.signup,
);

// api endpoint to logout user
router.get(
    '/logout',
    authMiddleware.logout,
    authController.logout,
);

// api endpoint to change user password
router.put(
    '/change-password',
    authMiddleware.isAuthenticated,
    authController.changePassword,
);

// api endpoint to forgot password. It send the reset mail to the user
router.post(
    '/forgot-password',
    authController.forgotPassword,
);

// api endpoint to reset the user password
router.get(
    '/reset-password/:token',
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
    authMiddleware.github,
    authController.githubAuth,
);

// api endpoint to login/signup user through google
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile'] }),
);

// api endpoint to callback url for passport google auth
router.get('/google/callback',
    authMiddleware.google,
    authController.googleAuth,
);

module.exports = router;
