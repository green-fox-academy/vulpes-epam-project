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

    function deleteById(id) {
      $http.delete('api/questions/' + id).then(fetchAllQuestions);
    }

    return {
      deleteById: deleteById,
      fetchAllQuestions: fetchAllQuestions,
      getAllQuestions: getAllQuestions,
    };
  });
