// Import package
const { default: to } = require('await-to-js');

// Import model
const Movie = require('./movie.model');

// Import constants
const movieConstants = require('./movie.constants');

// Import helper functions
const { constructPagination, constructsearchquery, constructFilterQueryObj, constructSorting } = require('./movie.helper');

// Import logger
const logger = require('../../config/logger/logger');

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
const getAllMovies = async (req, res) => {
  logger.info(' Started getting movies data');

  // Filtering
  const { filteringCondition, filteringValue, filteringField } = constructFilterQueryObj(req);

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
                [filteringCondition]: [filteringField, Number(filteringValue)],
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
    return res.status(406).json({ success: 0, message: movieConstants.failure, data: null });
  };

  if (movies.length === 0) {
    logger.info('No movie document found with the requested query params', { search: req.query.search, searchQuery, pageNo, limit, skip });
    return res.status(200).json({ success: 1, message: movieConstants.noMovieFound, data: { movies: [], totalCount: 0 } });
  }

  logger.info('Movies data is fetched successfully');
  return res.status(200).json({ success: 1, message: movieConstants.success, data: { ...movies[0] } });
};

module.exports = { getAllMovies };
