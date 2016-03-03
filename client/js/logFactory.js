'use strict';

var EPAM = require('./main');

EPAM.factory('logger', function ($http) {

  function sendLog(event, toState) {
    window.document.title = toState.data.pageTitle;
    var logMessage = { level: 'info', toState: toState.url };
    $http.post('/api/log', logMessage);
  }

  return {
    sendLog: sendLog,
  };
});
