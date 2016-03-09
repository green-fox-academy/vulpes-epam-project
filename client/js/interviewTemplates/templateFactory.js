'use strict';

var EPAM = require('../main');

EPAM.factory('templatesList', function ($http) {
    var listOfTemplates = [];

    function getAllTemplates() {
      return listOfTemplates;
    }

    function fetchAllTemplates() {
      $http.get('/api/templates').then(function (response) {
        listOfTemplates = response.data.templates;
      });
    }

    return {
      getAllTemplates: getAllTemplates,
      fetchAllTemplates: fetchAllTemplates,
    };
  });
