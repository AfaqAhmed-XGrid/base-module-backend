// Package imports
const { query, param, body } = require('express-validator');

module.exports = {
  validateGetAllUsers: [
    query('method').optional().isIn(['local', 'github', 'google']).withMessage('Invalid \'method\' parameter. It should be \'local\', \'google\', \'github\', or undefined.'),
    query('search').optional().isString().withMessage('Invalid \'search\' parameter. It should be a string, or undefined.'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Invalid \'limit\' parameter. It should be a positive number or undefined.'),
    query('pageNo').optional().isInt({ min: 1 }).withMessage('Invalid \'pageNo\' parameter. It should be a positive number or undefined.'),
  ],
  validateIdParam: [
    param('id').notEmpty().isString().withMessage('Invalid required \'id\' parameter. It should be a string and is required.'),
  ],
};
