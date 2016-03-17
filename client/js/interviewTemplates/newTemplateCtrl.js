'use strict';

var EPAM = require('../main');

EPAM.controller('NewTemplateCtrl', function ($scope, $state, templates, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    } else if (!user.isAdmin()) {
      $state.go('home');
    }

    $scope.types = ['html', 'js', 'css'];

    $scope.forms = [{}];

    $scope.addRow = function () {
      $scope.forms.push({});
    };

    $scope.sendNewTemplate = function (templateName) {
      var newTemplate = { title: templateName, schema: $scope.forms };
      templates.addNewTemplate(newTemplate)
      .then(handleSuccess)
      .catch(handleError);
    };

    function handleSuccess() {
      $state.go('templates');
    }

    function handleError(error) {
      $scope.Error = error.data;
    }

  });
