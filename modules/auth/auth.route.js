// Package imports
const express = require('express');
const passport = require('passport');

// constant imports
const {loginCtrl, signupCtrl, forgotPasswordCtrl, changePasswordCtrl, logoutCtrl, resetPasswordCtrl, getProfileData, updateProfileCtrl, googleCtrl, githubCtrl} = require('./auth.controller');
const {isAuthenticated, loginMiddleware, signupMiddleware, googleMiddleware, githubMiddleware} = require('./auth.middleware');

// Creating instance
const router = express.Router();

// Creating Routes
router.post('/local-login', loginMiddleware, loginCtrl);
router.post('/local-signup', signupMiddleware, signupCtrl);
router.post('/logout', logoutCtrl);
router.put('/local-changepassword', isAuthenticated, changePasswordCtrl);
router.post('/local-forgotpassword', forgotPasswordCtrl);
router.get('/local-resetpassword/:token', resetPasswordCtrl);
router.get('/user', isAuthenticated, getProfileData);
router.put('/update-profile', isAuthenticated, updateProfileCtrl);
router.get('/github', passport.authenticate('github', {scope: ['profile']}));
router.get('/github/callback', githubMiddleware, githubCtrl);
router.get('/google', passport.authenticate('google', {scope: ['profile']}));
router.get('/google/callback', googleMiddleware, googleCtrl);

module.exports = router;
