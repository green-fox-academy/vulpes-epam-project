'use strict';

var logger = require('./log.js')();

function createLogController() {
  var frontendLogLevel = 'info';
  var levels = ['debug', 'info', 'warn', 'error'];

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

    res.status(200).json({ 'Logging:': 'Faild' });
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
