'use strict';

angular.module('myapp')
  .controller('LogInCtrl', function ($scope, $state, user) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }

    $scope.userLogin = function () {
      var handleSucces = function (response) {
        user.setUserValues(response.data, true);
        $state.go('home');
      };

      var handleError = function (response) {
        $scope.Error = response.data;
        $scope.password = '';
      };

      user.loginUser({
        email: $scope.email,
        password: $scope.password,
      }, handleSucces, handleError);
    };
  });
