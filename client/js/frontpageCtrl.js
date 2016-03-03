'use strict';

var EPAM = require('./main');

EPAM.controller('FrontpageCtrl', function ($scope, $state, usersList, user) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }
  });
