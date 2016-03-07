'use strict';

var EPAM = require('./main');

EPAM.controller('RegisterCtrl', function ($scope, $state, user, logger) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }

    $scope.addUser = function (email, password) {
      user.addNewUser({
        email: email,
        password: password,
      })
      .then(handleSuccess)
      .catch(handleError);
    };

    function handleSuccess() {
      $state.go('home');
    }

    function handleError(error) {
      $scope.Error = error.data.message;
      $scope.password = '';
      logger.createLogMessage('error', 'Failed registration!');
    }
  });
