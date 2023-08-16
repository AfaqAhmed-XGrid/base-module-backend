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

// Import Packges
const express = require('express');

// Import controllers
const { getAllMovies, getGraphData, postMovieData } = require('./movie.controller');

// Import middleware
const movieMiddleware = require('./movie.middleware');
const commonMiddleware = require('../../common/commonMiddleware');

// Creating isntance
const router = express.Router();

// Api endpoint to get movies data
router.get(
    '/all-movies',
    movieMiddleware.validateGetAllMovies,
    commonMiddleware.validationError,
    getAllMovies,
);

// Api endpoint to get graph data
router.get(
    '/graph-data',
    movieMiddleware.validateGetGraphData,
    commonMiddleware.validationError,
    getGraphData,
);

// Api endpoint to post movie data
router.post(
    '/movie-data',
    movieMiddleware.validatePostMovieData,
    commonMiddleware.validationError,
    postMovieData,
);

module.exports = router;
