'use strict';

var logger = require('./log.js')();
var config = require('./config.js');

function createLogController() {
  var frontendLogLevel = config.DEFAULT_FRONTEND_LOGGING_LEVEL;
  var levels = config.LOGGING_LEVELS;

  function logRequest(req, res, next) {
    var logLevel = 'info';
    var logMessage = `NEW REQUEST, method=${req.method}, url=${req.originalUrl}`;
    logger.message(logLevel, logMessage);
    next();
  }

  function logFrontendEvent(req, res) {
    var logLevel = req.body.level;
    var logMessage = `NEW FRONTEND EVENT, ${req.body.message}`;
    logger.message(logLevel, logMessage);
    if (isValidLevel(logLevel)) {
      return res.status(200).json({
        level: logLevel,
        date: new Date().toISOString(),
        message: logMessage,
      });
    }

    res.status(200).json({ 'Logging:': 'Not allowed' });
  }

  function isValidLevel(level) {
    return levels.indexOf(level) >= levels.indexOf(frontendLogLevel);
  }

  return {
    logRequest: logRequest,
    logFrontendEvent: logFrontendEvent,
  };
}

module.exports = createLogController;
