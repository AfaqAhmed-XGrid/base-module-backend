// package imports
const mongoose = require('mongoose');
const to = require('await-to-js').default;
const env = require('dotenv').config();

// Logger import
const logger = require('./logger/logger');

// Constant imports
const constants = require('./constants');

/**
 * Connecting mongodb server using mongoose
 */
const dbConnect = async () => {
  const [err, success] = await to(mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));

  if (err) logger.error('db could not be connected', { error: err });
  if (success) logger.info('db is connected successfully');
};

module.exports = dbConnect;
