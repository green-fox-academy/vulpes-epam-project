'use strict';

var EPAM = require('./main');

EPAM.factory('question', function ($http) {
    var question = {
      content: '',
      type: '',
    };

    function addNewQuestion(newQuestion) {
      return $http.post('/api/questions', newQuestion);
    }

    return {
      addNewQuestion: addNewQuestion,
    };
  });
