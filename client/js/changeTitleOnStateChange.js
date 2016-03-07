'use strict';

var EPAM = require('./main');

EPAM.run(function ($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    window.document.title = toState.data.pageTitle;
  });
});
