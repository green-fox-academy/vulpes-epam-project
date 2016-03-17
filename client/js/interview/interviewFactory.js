'use strict';

var EPAM = require('../main');

EPAM.factory('interview', function ($http) {
    var templateId;
    var questions = [
      'What is the difference between call and apply?',
      'What is the difference between inline and block level elements?',
      'What is a closure in Javascript?',
      'What is love?',
    ];

    function setTemplateById(id) {
      templateId = id;
    }

    function getInterview() {
      var url = '/api/templates/' + templateId;
      return $http.get(url).then(function (response) {
        questions = response.questions;
      });
    }

    function getQuestions() {
      return questions;
    }

    return {
      setTemplateById: setTemplateById,
      getInterview: getInterview,
      getQuestions: getQuestions,
    };
  });
