'use strict';

var EPAM = require('../main');

EPAM.controller('InterviewCtrl', function ($scope, interview) {
  $scope.questions = interview.getQuestions();

  $scope.generateNewQuestions = function () {
    $scope.questions = ['What is the new question?'];
  };
});
