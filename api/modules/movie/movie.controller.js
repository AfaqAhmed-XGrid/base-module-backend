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

// Import package
const { default: to } = require('await-to-js');

// Import model
const Movie = require('./movie.model');

// Import constants
const movieConstants = require('./movie.constants');

// Import helper functions
const { constructPagination, constructsearchquery, constructFilterQueryObj, constructSorting, constructYearFilteration } = require('./movie.helper');

// Import logger
const logger = require('../../config/logger/logger');

// Import statuscodes
const statusCodes = require('../../constants/statusCodes');

/**
 * Controller Function to get all movies data and to handle all queries
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const getAllMovies = async (req, res) => {
  logger.info(' Started getting movies data');

  // Filtering
  const filterObj = constructFilterQueryObj(req);

  // Searching
  const searchQuery = constructsearchquery(req);

  // Pagination
  const { pageNo, limit, skip } = constructPagination(req);

  // Sorting
  const { sortingField, sortingOrder } = constructSorting(req);

  const [err, movies] = await to(
      Movie.aggregate([
        {
          $match: {
            $and: [
              { ...searchQuery },
              { $expr: {
                $and: filterObj,
              },
              },
            ],
          },
        },
        {
          $sort: { [sortingField]: Number(sortingOrder) },
        },
        {
          $facet: {
            movies: [
              { $skip: skip },
              { $limit: limit },
            ],
            totalCount: [
              { $group: { _id: null, count: { $sum: 1 } } },
            ],
          },
        },
        {
          $project: {
            movies: 1,
            movieCount: { $arrayElemAt: ['$totalCount.count', 0] },
            totalPages: { $ceil: { $divide: [{ $arrayElemAt: ['$totalCount.count', 0] }, limit] } },
            currentPage: pageNo,
          },
        },
      ]).exec(),
  );

  if (err) {
    logger.error('Failed to fetch the movies data', { error: err });
    return res.status(statusCodes.internalError).json({ success: 0, message: movieConstants.responseMessages.getAllMovies.failure, data: null });
  };

  if (movies.length === 0) {
    logger.info('No movie document found with the requested query params', { search: req.query.search, searchQuery, pageNo, limit, skip });
    return res.status(statusCodes.success).json({ success: 1, message: movieConstants.responseMessages.getAllMovies.noMovieFound, data: { movies: [], totalCount: 0 } });
  }

  logger.info('Movies data is fetched successfully');
  return res.status(statusCodes.success).json({ success: 1, message: movieConstants.responseMessages.getAllMovies.success, data: { ...movies[0] } });
};

/**
 * Controller Function to get the movies data regarding production budget and movies count per year
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<Object>}
 */
const getGraphData = async (req, res) => {
  logger.info('Started getting average production per year and movies count per year');

  const yearRange = constructYearFilteration(req);
  const [err, data] = await to(Movie.aggregate([
    yearRange,
    {
      $group: {
        _id: { $year: '$releaseDate' },
        averageProductionBudget: { $avg: '$productionBudget' },
        moviesCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        year: '$_id',
        averageProductionBudget: 1,
        moviesCount: 1,
      },
    },
    {
      $sort: { year: 1 },
    },
  ]));

  if (err) {
    logger.error('Error in getting average production per year and movies count per year data', { error: err });
    return res.status(statusCodes.internalError).json({ success: 0, message: movieConstants.responseMessages.getGraphData.failure, data: null });
  };

  logger.info('Got average production per year and movies count per year successfully');
  return res.status(statusCodes.success).json({ success: 1, message: movieConstants.responseMessages.getGraphData.success, data: data });
};

/**
 * Function to post movie data in db
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const postMovieData = async (req, res) => {
  logger.info('Starting saving movie data');
  const newMovie = new Movie(req.body);
  const [err, newMovieSaved] = await to(newMovie.save());

  if (err) {
    logger.error('Error in saving movie data', { error: err });
    return res.status(statusCodes.internalError).json({ success: 0, message: movieConstants.responseMessages.postMovieData.failure, data: null });
  };

  logger.info('Movie data is saved successfully', { data: newMovieSaved });
  return res.status(statusCodes.success).json({ success: 1, message: movieConstants.responseMessages.postMovieData.success, data: newMovieSaved });
};

module.exports = { getAllMovies, getGraphData, postMovieData };
