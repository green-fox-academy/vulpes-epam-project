'use strict';

var EPAM = require('./main');

EPAM.controller('QuestionCtrl', function ($scope, $state, question, user) {
    if (!user.isLoggedIn() || !user.isAdmin()) {
      $state.go('login');
    }

    $scope.questionSend = function (content, type) {
      question.addNewQuestion({
        content: content,
        type: type,
      })
      .then(handleSuccess)
      .catch(handleError);
    };

    function handleSuccess() {
      $state.go('questions');
    }

    function handleError(error) {
      $scope.Error = error.data;
    }

    $scope.types = [
      { type: 'html' },
      { type: 'js' },
      { type: 'css' },
    ];
  });
