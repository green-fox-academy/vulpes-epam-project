'use strict';

var EPAM = require('./main');

EPAM.controller('ListQuestionsCtrl', function ($scope, $state, questionsList, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    }

    $scope.isAdmin = user.isAdmin();

    $scope.deleteQuestionFromQuestionsList = function (row) {
      questionsList.deleteById(row.question_id);
    };

    $scope.getQuestions = function () {
      return questionsList.getAllQuestions();
    };

    questionsList.fetchAllQuestions();
  });
