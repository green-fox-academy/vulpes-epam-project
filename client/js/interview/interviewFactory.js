'use strict';

var EPAM = require('../main');

EPAM.factory('interview', function ($http) {
    var templateId;

    function setTemplateById(id) {
      templateId = id;
    }

    function getInterview() {
      var url = '/api/templates/' + templateId;
      return $http.get(url);
    }

    return {
      setTemplateById: setTemplateById,
      getInterview: getInterview,
    };
  });
