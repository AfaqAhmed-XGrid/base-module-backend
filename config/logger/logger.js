// Package imports
const { createLogger, format, transports } = require('winston');
const constants = require('../constants');

const logger = createLogger({
  format: format.combine(
      format.timestamp({
        format: constants.logger.dateFormat,
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
        format.colorize(),
        format.simple(),
    ),
  }));
}

module.exports = logger;
