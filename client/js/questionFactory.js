'use strict';

var EPAM = require('./main');

EPAM.factory('question', function ($http) {
    function addNewQuestion(newQuestion) {
      return $http.post('/api/questions', newQuestion);
    }

    return {
      addNewQuestion: addNewQuestion,
    };
  });
