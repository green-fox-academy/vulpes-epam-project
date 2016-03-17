'use strict';

var EPAM = require('../main');

EPAM.controller('InterviewCtrl', function ($scope, interview) {
  $scope.questions = interview.getQuestions();
});
