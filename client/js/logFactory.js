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
    window.document.title = toState.data.pageTitle;
    var logMessage = { level: 'info', message: `ROUTE CHANGED TO: ${toState.url}` };
    sendLog(logMessage);
  }

  function sendLog(logMessage) {
    $http.post('/api/log', logMessage).then(function (res) {
      console.log(res.data);
    }).catch(function (err) {
      console.log(err);
    });
  }

  return {
    stateChangeLogger: stateChangeLogger,
    createLogMessage: createLogMessage,
  };
});
