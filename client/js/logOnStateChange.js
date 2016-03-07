'use strict';

var EPAM = require('./main');

EPAM.run(function ($rootScope, logger) {
  $rootScope.$on('$stateChangeSuccess', logger.stateChangeLogger);
});
