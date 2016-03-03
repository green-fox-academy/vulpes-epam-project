'use strict';

angular.module('myapp')
  .factory('questionsList', function ($http) {
    var listOfQuestions = [];

    function getAllQuestions() {
      return listOfQuestions;
    }

    function fetchAllQuestions() {
      $http.get('/api/questions').then(function (response) {
        listOfQuestions = response.data;
      });
    }

    return {
      getAllQuestions: getAllQuestions,
      fetchAllQuestions: fetchAllQuestions,
    };
  });
