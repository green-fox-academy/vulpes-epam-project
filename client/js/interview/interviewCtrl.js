'use strict';

var EPAM = require('../main');

EPAM.controller('InterviewCtrl', function ($scope, interview) {
  $scope.questions = interview.getQuestions();

  $scope.generateNewQuestions = function () {
    interview.getInterview().then(function () {
      $scope.questions = interview.getQuestions();
    });
  };
});
