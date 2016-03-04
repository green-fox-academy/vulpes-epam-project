'use strict';

var EPAM = require('./main');

EPAM.factory('logger', function ($http) {

  function stateChangeLogger(event, toState) {
    window.document.title = toState.data.pageTitle;
    var logMessage = { level: 'info', message: `ROUTE CHANGED TO: ${toState.url}` };
    sendLog(logMessage);
  }

  function sendLog(logMessage) {
    $http.post('/api/log', logMessage);
  }

  return {
    sendLog: sendLog,
    stateChangeLogger: stateChangeLogger,
  };
});
