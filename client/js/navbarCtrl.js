'use strict';

angular.module('myapp')
  .controller('NavbarCtrl', function ($scope, $state, user) {
    $scope.user = user;

    $scope.logoutUser = function () {
      user.logoutUser()
          .then(onSuccess, onError);
    };

    function onSuccess() {
      user.resetUser();
      $state.go('frontpage');
    }

    function onError(res) {
      user.resetUser();
      window.alert(res.data);
      $state.go('frontpage');
    }
  });
