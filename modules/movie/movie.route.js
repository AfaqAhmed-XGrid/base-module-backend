// Package Import
const express = require( 'express' );
const { isAuthenticated } = require( '../auth/auth.middleware' );
const { getAllMoviesCtrl } = require( './movie.controller' );

// Creating isntance
const router = express.Router();

// Creating movie routes
router.get( '/getallmovies', getAllMoviesCtrl );

module.exports = router;
