'use strict';

angular.module('myapp')
.run(function ($rootScope, $http) {
  $rootScope.$on('$stateChangeStart',
    function (event, toState) {
      window.document.title = toState.data.pageTitle;
      var logMessage = { level: 'info', toState: toState.url };
      $http.post('/api/log', logMessage);
    });
});
