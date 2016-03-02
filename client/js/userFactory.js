'use strict';

angular.module('myapp')
  .factory('user', function ($http) {

    var currentUser = {
      isAuthenticated: false,
      email: '',
      isAdmin: false,
      isLoggedIn: false,
    };

    function setUserValues(values, isLoggedIn) {
      currentUser.email = values.email;
      currentUser.isAdmin = values.isadmin;
      currentUser.isLoggedIn = isLoggedIn;
    }

    function resetUser() {
      setUserValues({
        email: '',
        isAdmin: false,
      },
      false);
    }

    function isAuthenticated() {
      return currentUser.isAuthenticated;
    }

    function isAdmin() {
      return currentUser.isAdmin;
    }

    function isLoggedIn() {
      return currentUser.isLoggedIn;
    }

    function setAuthenticated() {
      currentUser.isAuthenticated = true;
    }

    function getEmail() {
      return currentUser.email;
    }

    function addNewUser(newUser) {
      return $http.post('/api/register', newUser).then(function (response) {
        setUserValues(response.data, true);
      });
    }

    function login(user) {
      return $http.post('/api/login', user).then(function (response) {
        setUserValues(response.data, true);
      });
    }

    function logoutUser() {
      return $http.get('/api/logout');
    }

    function authenticateUser() {
      return $http.get('/api/user');
    }

    return {
      setUserValues: setUserValues,
      resetUser: resetUser,
      isAuthenticated: isAuthenticated,
      isAdmin: isAdmin,
      isLoggedIn: isLoggedIn,
      setAuthenticated: setAuthenticated,
      getEmail: getEmail,
      authenticateUser: authenticateUser,
      addNewUser: addNewUser,
      login: login,
      logoutUser: logoutUser,
    };
  });
