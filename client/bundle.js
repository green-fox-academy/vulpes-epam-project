(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.run(function ($rootScope, $http, $state, user) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState) {

        if (!user.isAuthenticated()) {
          stopStateChange();
          user.authenticateUser()
              .then(continueStateChange);
        }

        function stopStateChange() {
          event.preventDefault();
        }

        function continueStateChange() {
          $state.go(toState);
        }

      });
  });

},{"./main":8}],2:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.controller('FrontpageCtrl', function ($scope, $state, usersList, user) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }
  });

},{"./main":8}],3:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.controller('HomeCtrl', function ($scope, $state, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    }

    $scope.user = user;
  });

},{"./main":8}],4:[function(require,module,exports){
'use strict';

require('./main.js');
require('./userFactory.js');
require('./userListFactory.js');
require('./frontpageCtrl.js');
require('./listUsersCtrl.js');
require('./loginCtrl.js');
require('./registerCtrl.js');
require('./homeCtrl.js');
require('./navbarCtrl.js');
require('./router.js');
require('./authOnStateChange.js');
require('./logOnStateChange.js');

},{"./authOnStateChange.js":1,"./frontpageCtrl.js":2,"./homeCtrl.js":3,"./listUsersCtrl.js":5,"./logOnStateChange.js":6,"./loginCtrl.js":7,"./main.js":8,"./navbarCtrl.js":9,"./registerCtrl.js":10,"./router.js":11,"./userFactory.js":12,"./userListFactory.js":13}],5:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.controller('ListUsersCtrl', function ($scope, $state, usersList, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    } else if (!user.isAdmin()) {
      $state.go('home');
    }

    $scope.getUsers = function () {
      return usersList.getAllUser();
    };

    $scope.currentUser = {
      email: user.getEmail(),
    };

    usersList.fetchAllUsers();
  });

},{"./main":8}],6:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.run(function ($rootScope, $http) {
  $rootScope.$on('$stateChangeStart',
    function (event, toState) {
      window.document.title = toState.data.pageTitle;
      var logMessage = { level: 'info', toState: toState.url };
      $http.post('/api/log', logMessage);
    });
});

},{"./main":8}],7:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.controller('LogInCtrl', function ($scope, $state, user) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }

    $scope.userLogin = function (email, password) {
      user.login({
        email: email,
        password: password,
      })
      .then(handleSuccess)
      .catch(handleError);
    };

    function handleSuccess() {
      $state.go('home');
    }

    function handleError(error) {
      $scope.Error = error.data;
      $scope.password = '';
    }
  });

},{"./main":8}],8:[function(require,module,exports){
'use strict';

var EPAM = angular.module('epamInterviewer', ['ui.router']);

module.exports = EPAM;

},{}],9:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.controller('NavbarCtrl', function ($scope, $state, user) {
    $scope.user = user;

    $scope.logoutUser = function () {
      user.logoutUser()
          .then(onSuccess)
          .catch(onError);
    };

    function onSuccess() {
      $state.go('frontpage');
    }

    function onError() {
      $state.go('frontpage');
    }
  });

},{"./main":8}],10:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.controller('RegisterCtrl', function ($scope, $state, user) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }

    $scope.addUser = function (email, password) {
      user.addNewUser({
        email: email,
        password: password,
      })
      .then(handleSuccess)
      .catch(handleError);
    };

    function handleSuccess() {
      $state.go('home');
    }

    function handleError(error) {
      $scope.Error = error.data.errorMessage;
      $scope.password = '';
    }
  });

},{"./main":8}],11:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('frontpage', {
        url: '/',
        templateUrl: './templates/frontpage.html',
        controller: 'FrontpageCtrl',
        data: {
          pageTitle: 'Epam@Interviewer',
        },
      })
      .state('register', {
        url: '/register',
        templateUrl: './templates/register.html',
        controller: 'RegisterCtrl',
        data: {
          pageTitle: 'Register',
        },
      })
      .state('login', {
        url: '/login',
        templateUrl: './templates/login.html',
        data: {
          pageTitle: 'Login',
        },
      })
      .state('home', {
        url: '/home',
        templateUrl: './templates/home.html',
        controller: 'HomeCtrl',
        data: {
          pageTitle: 'Home',
        },
      })
      .state('users', {
        url: '/users',
        templateUrl: './templates/users.html',
        data: {
          pageTitle: 'Users',
        },
      });
  });

},{"./main":8}],12:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.factory('user', function ($http) {
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

},{"./main":8}],13:[function(require,module,exports){
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

},{"./main":8}]},{},[4]);
