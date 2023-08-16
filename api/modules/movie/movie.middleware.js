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

// Package imports
const { query, body } = require('express-validator');

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
  validatePostMovieData: [
    body('releaseDate')
        .notEmpty()
        .custom((value) => {
          const date = new Date(value); // Convert the value to a Date object
          return !isNaN(date.getTime()); // Check if the Date object is valid
        })
        .withMessage(
            'Invalid \'releaseDate\' parameter. It should be a date and is required.',
        ),
    body('title')
        .notEmpty()
        .isString()
        .withMessage(
            'Invalid \'title\' parameter. It should be a string and is required.',
        ),
    body('productionBudget')
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage(
            'Invalid \'productionBudget\' parameter. It should be a number and is required.',
        ),
    body('domesticGross')
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage(
            'Invalid \'domesticGross\' parameter. It should be a number and is required.',
        ),
    body('worldWideGross')
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage(
            'Invalid \'worldWideGross\' parameter. It should be a number and is required.',
        ),
  ],
};
