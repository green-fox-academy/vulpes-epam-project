'use strict';

var EPAM = require('./main');

EPAM.controller('ListQuestionsCtrl', function ($scope, $state, questionsList, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    } else if (!user.isAdmin()) {
      $state.go('home');
    }

    $scope.deleteQuestionFromQuestionsList = function (row) {
      questionsList.deleteById(row.question_id);
    };

    $scope.getQuestions = function () {
      return questionsList.getAllQuestions();
    };

    questionsList.fetchAllQuestions();
  });
