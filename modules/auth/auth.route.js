// Package imports
const express = require( 'express' );
const passport = require( 'passport' );

// constant imports
const authController = require( './auth.controller' );
const authMiddleware = require( './auth.middleware' );

// Creating instance
const router = express.Router();

// Creating Routes
router.post(
    '/login',
    authMiddleware.login,
    authController.login,
);
router.post(
    '/signup',
    authMiddleware.signup,
    authController.signup,
);
router.get(
    '/logout',
    authMiddleware.logout,
    authController.logout,
);
router.put(
    '/change-password',
    authMiddleware.isAuthenticated,
    authController.changePassword,
);
router.post(
    '/forgot-password',
    authController.forgotPassword,
);
router.get(
    '/reset-password/:token',
    authController.resetPassword,
);
router.get(
    '/user',
    isAuthenticated,
    authController.getProfileData,
);
router.put(
    '/update-profile',
    authMiddleware.isAuthenticated,
    authController.updateProfile,
);
router.get(
    '/github',
    passport.authenticate( 'github', { scope: [ 'profile' ] } ),
);
router.get(
    '/github/callback',
    authMiddleware.github,
    authController.githubAuth,
);
router.get(
    '/google',
    passport.authenticate( 'google', { scope: [ 'profile' ] } ),
);
router.get( '/google/callback',
    authMiddleware.google,
    authController.googleAuth );

module.exports = router;
