'use strict';

angular.module('myapp')
  .factory('question', function ($http) {
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
