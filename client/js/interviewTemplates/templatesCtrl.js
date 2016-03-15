'use strict';

var EPAM = require('../main');

EPAM.controller('ListTemplatesCtrl', function ($scope, $state, templates, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    } else if (!user.isAdmin()) {
      $state.go('home');
    }

    $scope.isAdmin = user.isAdmin();

    $scope.getTemplates = function () {
      return templates.getAllTemplates();
    };

    templates.fetchAllTemplates();
  });
