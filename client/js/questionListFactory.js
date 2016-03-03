'use strict';

var EPAM = require('./main');

EPAM.factory('questionsList', function ($http) {
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
