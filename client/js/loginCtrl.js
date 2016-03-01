'use strict';

angular.module('myapp')
  .controller('LogInCtrl', function ($scope, $state, user) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }

    $scope.userLogin = function () {
      user.loginUser({
        email: $scope.email,
        password: $scope.password, })
        .then(handleSuccess)
        .catch(handleError);
    };

    function handleSuccess(response) {
      user.setUserValues(response.data, true);
      $state.go('home');
    }

    function handleError(error) {
      $scope.Error = error.data;
      $scope.password = '';
    }
  });
