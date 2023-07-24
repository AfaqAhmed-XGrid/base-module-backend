// constant imports
const constants = require('./practice.constant');

/**
 * Sends welcome message on request
 * @param {Object} req
 * @param {Object} res
 */
const printMessage = async (req, res) => {
  res.status(200);
  res.json({ success: 1, message: constants.WELCOME_MSG, data: {} });
};

/**
 * Sends html tag with welcome message on request
 * @param {Object} req
 * @param {Object} res
 */
const createHTML = async (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200);
  res.json({ success: 1, message: constants.WELCOME_TAG, data: {} });
};

/**
 * Gets name of request body and say hi to him
 * @param {Object} req
 * @param {Object} res
 */
const printName = async (req, res) => {
  res.status(200);
  res.json({ success: 1, message: `Hello ${req.body.name}`, data: { name } });
};

module.exports = { printMessage, createHTML, printName };
