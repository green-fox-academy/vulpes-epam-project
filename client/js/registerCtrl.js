'use strict';

angular.module('myapp')
  .controller('RegisterCtrl', function ($scope, $state, user) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }

    $scope.addUser = function () {
      user.addNewUser({
        email: $scope.email,
        password: $scope.password, })
        .then(handleSuccess)
        .catch(handleError);
    };

    function handleSuccess() {
      $state.go('login');
    }

    function handleError(error) {
      $scope.Error = error.statusText;
      $scope.password = '';
    }
  });
