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
    return res.status(406).json({ success: 0, message: movieConstants.responseMessages.getAllMovies.failure, data: null });
  };

  if (movies.length === 0) {
    logger.info('No movie document found with the requested query params', { search: req.query.search, searchQuery, pageNo, limit, skip });
    return res.status(200).json({ success: 1, message: movieConstants.responseMessages.getAllMovies.noMovieFound, data: { movies: [], totalCount: 0 } });
  }

  logger.info('Movies data is fetched successfully');
  return res.status(200).json({ success: 1, message: movieConstants.responseMessages.getAllMovies.success, data: { ...movies[0] } });
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
    return res.status(406).json({ success: 0, message: movieConstants.responseMessages.getGraphData.failure, data: null });
  };

  logger.info('Got average production per year and movies count per year successfully');
  return res.status(200).json({ success: 1, message: movieConstants.responseMessages.getGraphData.success, data: data });
};

module.exports = { getAllMovies, getGraphData };
