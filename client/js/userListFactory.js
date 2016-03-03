'use strict';

var EPAM = require('./main');

EPAM.factory('usersList', function ($http) {
    var listOfUsers = [];

    function getAllUser() {
      return listOfUsers;
    }

    function fetchAllUsers() {
      $http.get('/api/users').then(function (response) {
        listOfUsers = response.data;
      });
    }

    return {
      getAllUser: getAllUser,
      fetchAllUsers: fetchAllUsers,
    };
  });
