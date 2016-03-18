'use strict';

var EPAM = require('../main');

EPAM.controller('NewInterviewCtrl', function ($scope, $state, user, templates, interview) {
  if (!user.isLoggedIn()) {
    $state.go('login');
  }

  $scope.isLoaded = false;
  $scope.templatesList = [];

  templates.fetchAllTemplates()
    .then(function () {
      $scope.templatesList = templates.getAllTemplates();
      $scope.isLoaded = true;
    });

  $scope.selectTemplate = function (id) {
    interview.setTemplateById(id);
  };

  $scope.startInterview = function () {
    interview.getInterview().then(function () {
      $state.go('interview');
    });
  };
});
