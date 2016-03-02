'use strict';

angular.module('myapp')
  .controller('RegisterCtrl', function ($scope, $state, user) {
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

    function handleSuccess(response) {
      user.setUserValues(response.data, true);
      $state.go('home');
    }

    function handleError(error) {
      $scope.Error = error.data.errorMessage;
      $scope.password = '';
    }
  });
