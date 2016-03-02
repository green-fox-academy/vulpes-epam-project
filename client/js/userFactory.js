'use strict';

angular.module('myapp')
  .factory('user', function ($http) {

    var currentUser = {
      isAuthenticated: false,
      email: '',
      isAdmin: false,
      isLoggedIn: false,
    };

    function setLoggedInUser(response) {
      var user = response.data;
      currentUser.email = user.email;
      currentUser.isAdmin = user.isadmin;
      currentUser.isLoggedIn = isLoggedIn;
    }

    function resetUser() {
      currentUser.email = '';
      currentUser.isAdmin = false;
      currentUser.isLoggedIn = false;
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
      return $http.post('/api/register', newUser).then(setLoggedInUser);
    }

    function login(user) {
      return $http.post('/api/login', user).then(setLoggedInUser);
    }

    function logoutUser() {
      return $http.get('/api/logout').then(resetUser);
    }

    function authenticateUser() {
      return $http.get('/api/user').then(function (res) {
          res.status === 200 ? setLoggedInUser(res)
                             : resetUser();
          setAuthenticated();
        });
    }

    return {
      isAuthenticated: isAuthenticated,
      isAdmin: isAdmin,
      isLoggedIn: isLoggedIn,
      getEmail: getEmail,
      authenticateUser: authenticateUser,
      addNewUser: addNewUser,
      login: login,
      logoutUser: logoutUser,
    };
  });
