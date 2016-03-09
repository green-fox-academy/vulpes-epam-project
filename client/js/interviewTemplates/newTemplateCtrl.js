'use strict';

var EPAM = require('../main');

EPAM.controller('NewTemplateCtrl', function ($scope, $state, templatesList, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    } else if (!user.isAdmin()) {
      $state.go('home');
    };

    $scope.isAdmin = user.isAdmin();
  });
