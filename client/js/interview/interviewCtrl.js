'use strict';

var EPAM = require('../main');

EPAM.controller('InterviewCtrl', function ($scope, $state, user, interview) {
  if (!user.isLoggedIn()) {
    $state.go('login');
  } else if (user.isAdmin()) {
    $state.go('home');
  }

  $scope.questions = interview.getQuestions();

  if (!$scope.questions) {
    $state.go('newInterview');
  }

  $scope.generateNewQuestions = function () {
    interview.getInterview().then(function () {
      $scope.questions = interview.getQuestions();
    });
  };
});
