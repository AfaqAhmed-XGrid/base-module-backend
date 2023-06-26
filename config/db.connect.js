// package imports
const mongoose = require('mongoose');
const to = require('await-to-js').default;

// Logger import
const logger = require('./logger/logger');

// Constant imports
const constants = require('./constants');

const dbConnect = async () => {
  const [err, success] = await to(mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));

  if (err) logger.error(constants.connectDB.failure, err);
  if (success) logger.info(constants.connectDB.success);
};

module.exports = dbConnect;
