'use strict';

var EPAM = require('../main');

EPAM.controller('NewTemplateCtrl', function ($scope, $state, templates, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    } else if (!user.isAdmin()) {
      $state.go('home');
    }

    $scope.isVisible = false;

    $scope.setVisible = function () {
      $scope.isVisible = true;
      return $scope.isVisible;
    };

    $scope.types = [
      { type: 'html' },
      { type: 'js' },
      { type: 'css' },
    ];

    $scope.sendNewTemplate = function (templateName, type, count, type2, count2) {
      var newTemplate = { title: templateName, schema:[] };
      var newSchema = [
                        { type: type, count: count },
                        { type: type2, count: count2 },
                     ];
      newTemplate.schema = newSchema;
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
