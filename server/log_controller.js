'use strict';

var logger = require('./log.js')();

function createLogController() {

  function logRequest(req, res, next) {
    var logLevel = 'info';
    var logMessage = `NEW REQUEST, method=${req.method}, url=${req.originalUrl}`;
    logger.message(logLevel, logMessage);
    next();
  }

  function logFrontendEvent(req, res) {
    var logLevel = req.body.level;
    var logMessage = `NEW FRONTEND EVENT, ROUTE CHANGED TO: ${req.body.toState}`;
    logger.message(logLevel, logMessage);
    res.status(200).json({ 'Logging:': 'Success' });
  }

  return {
    logRequest: logRequest,
    logFrontendEvent: logFrontendEvent,
  };
}

module.exports = createLogController;
