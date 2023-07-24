// Import Packges
const express = require('express');

// Import controllers
const { getAllMovies, getAverageBudgetAndMovieCountPerYear } = require('./movie.controller');

// Creating isntance
const router = express.Router();

// Api endpoint to get movies data
router.get('/get-all-movies', getAllMovies);
router.get('/get-graph-data', getAverageBudgetAndMovieCountPerYear);

module.exports = router;
