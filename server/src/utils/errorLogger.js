const { createLogger, format, transports } = require('winston');
const CONSTANTS = require('../constants');
const logFormat = format.printf(({ message, stack, code }) => {
  return JSON.stringify({
    message,
    time: Date.now(),
    code,
    stackTrace: { ...stack.split('\n    ') },
  });
});

const errorLogger = createLogger({
  format: format.combine(format.errors({ stack: true }), logFormat),
  transports: [
    new transports.File({
      filename: `${CONSTANTS.LOGGER_DIR}/${CONSTANTS.LOGGER_FILENAME}`,
      level: 'error',
    }),
  ],
});

module.exports = errorLogger;
