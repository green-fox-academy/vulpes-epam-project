'use strict';

var EPAM = require('../main');

EPAM.factory('interview', function ($http) {
    var templateId;
    var questions;

    function setTemplateById(id) {
      templateId = id;
    }

    function getInterview() {
      var url = '/api/interview/' + templateId;
      return $http.get(url).then(function (response) {
        questions = response.data.questions;
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
