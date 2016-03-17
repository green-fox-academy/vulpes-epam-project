'use strict';

var EPAM = require('../main');

EPAM.controller('NewInterviewCtrl', function ($scope, $state, templates, interview) {
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