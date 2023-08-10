// Package imports
const { query, param, body } = require('express-validator');

module.exports = {
  validateGetAllMovies: [
    query('sort')
        .optional()
        .isIn([
          '-releaseDate',
          '+releaseDate',
          '-productionBudget',
          '+productionBudget',
          '-domesticGross',
          '+domesticGross',
          '-worldWideGross',
          '+worldWideGross',
        ])
        .withMessage('Invalid \'sort\' parameter.'),
    query('search')
        .optional()
        .isString()
        .withMessage(
            'Invalid \'search\' parameter. It should be a string, or undefined.',
        ),
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage(
            'Invalid \'limit\' parameter. It should be a positive number or undefined.',
        ),
    query('pageNo')
        .optional()
        .isInt({ min: 1 })
        .withMessage(
            'Invalid \'pageNo\' parameter. It should be a positive number or undefined.',
        ),
    query('productionBudget[$lte]')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Invalid productionBudget[$lte] parameter.'),
    query('productionBudget[$gte]')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Invalid productionBudget[$gte] parameter.'),
    query('domesticGross[$lte]')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Invalid domesticGross[$lte] parameter.'),
    query('domesticGross[$gte]')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Invalid domesticGross[$gte] parameter.'),
    query('worldWideGross[$lte]')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Invalid worldWideGross[$lte] parameter.'),
    query('worldWideGross[$gte]')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Invalid worldWideGross[$gte] parameter.'),
  ],
  validateGetGraphData: [
    query('maxYear')
        .optional()
        .isInt({ min: 0 })
        .withMessage(
            'Invalid \'maxYear\' parameter. It should be a positive number or undefined.',
        ),
    query('minYear')
        .optional()
        .isInt({ min: 0 })
        .withMessage(
            'Invalid \'minYear\' parameter. It should be a positive number or undefined.',
        ),
  ],
};
