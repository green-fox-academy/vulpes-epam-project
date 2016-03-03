'use strict';

var EPAM = require('./main');

EPAM.controller('HomeCtrl', function ($scope, $state, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    }

    $scope.user = user;
  });
