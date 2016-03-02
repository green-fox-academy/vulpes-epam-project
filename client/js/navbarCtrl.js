'use strict';

angular.module('myapp')
  .controller('NavbarCtrl', function ($scope, $state, user) {
    $scope.user = user;

    $scope.logoutUser = function () {
      user.logoutUser()
          .then(onSuccess)
          .catch(onError);
    };

    function onSuccess() {
      $state.go('frontpage');
    }

    function onError() {
      $state.go('frontpage');
    }
  });
