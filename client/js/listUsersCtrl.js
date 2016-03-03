'use strict';

var EPAM = require('./main');

EPAM.controller('ListUsersCtrl', function ($scope, $state, usersList, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    } else if (!user.isAdmin()) {
      $state.go('home');
    }

    $scope.getUsers = function () {
      return usersList.getAllUser();
    };

    $scope.currentUser = {
      email: user.getEmail(),
    };

    usersList.fetchAllUsers();
  });
