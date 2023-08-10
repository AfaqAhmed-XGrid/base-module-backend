// Import Packges
const express = require('express');

// Import controllers
const { getAllMovies, getGraphData } = require('./movie.controller');

// Import middleware
const movieMiddleware = require('./movie.middleware');
const commonMiddleware = require('../../common/commonMiddleware');

// Creating isntance
const router = express.Router();

// Api endpoint to get movies data
router.get(
    '/get-all-movies',
    movieMiddleware.validateGetAllMovies,
    commonMiddleware.validationError,
    getAllMovies,
);

// Api endpoint to get graph data
router.get(
    '/get-graph-data',
    movieMiddleware.validateGetGraphData,
    commonMiddleware.validationError,
    getGraphData,
);

module.exports = router;
