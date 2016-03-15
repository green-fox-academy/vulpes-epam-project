'use strict';

var EPAM = require('../main');

EPAM.controller('NewTemplateCtrl', function ($scope, $state, templates, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    } else if (!user.isAdmin()) {
      $state.go('home');
    }

    $scope.types = [
      { type: 'html' },
      { type: 'js' },
      { type: 'css' },
    ];

    $scope.sendNewTemplate = function (templateName, type, count) {
      console.log(templateName + type + count);
      templates.addNewTemplate({
        title: templateName,
        type: type,
        count: count,
      })
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
