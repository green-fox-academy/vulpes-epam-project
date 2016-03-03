'use strict';

var EPAM = require('./main');

EPAM.run(function ($rootScope, $http, logger) {
  $rootScope.$on('$stateChangeStart', logger.sendLog);
});
