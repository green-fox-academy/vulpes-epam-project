'use strict';

var EPAM = require('./main');

EPAM.factory('logger', function ($http) {

  function createLogMessage(level, message) {
    var logMessage = {
      level: level,
      message: message,
    };
    sendLog(logMessage);
  }

  function stateChangeLogger(event, toState) {
    var logMessage = { level: 'info', message: `ROUTE CHANGED TO: ${toState.url}` };
    sendLog(logMessage);
  }

  function sendLog(logMessage) {
    $http.post('/api/log', logMessage)
      .then(displayLogMessage)
      .catch(displayError);
  }

  function displayLogMessage(response) {
    console.log(JSON.stringify(response.data));
  }

  function displayError(err) {
    console.log(err);
  }

  return {
    stateChangeLogger: stateChangeLogger,
    createLogMessage: createLogMessage,
  };
});
