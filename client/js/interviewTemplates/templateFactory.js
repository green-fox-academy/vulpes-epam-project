'use strict';

var EPAM = require('../main');

EPAM.factory('templates', function ($http) {
    var listOfTemplates = [];

    function getAllTemplates() {
      return listOfTemplates;
    }

    function fetchAllTemplates() {
      return $http.get('/api/templates').then(function (response) {
        listOfTemplates = response.data.templates;
      });
    }

    function addNewTemplate(newTemplate) {
      console.log(newTemplate);
      return $http.post('/api/templates', newTemplate);
    }

    return {
      getAllTemplates: getAllTemplates,
      fetchAllTemplates: fetchAllTemplates,
      addNewTemplate: addNewTemplate,
    };
  });
