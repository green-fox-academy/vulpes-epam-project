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

},{"./main":9}],2:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.controller('FrontpageCtrl', function ($scope, $state, usersList, user) {
    if (user.isLoggedIn()) {
      $state.go('home');
    }
  });

},{"./main":9}],3:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.controller('HomeCtrl', function ($scope, $state, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    }

    $scope.user = user;
  });

},{"./main":9}],4:[function(require,module,exports){
'use strict';

require('./main.js');
require('./userFactory.js');
require('./userListFactory.js');
require('./questionFactory.js');
require('./questionListFactory.js');
require('./frontpageCtrl.js');
require('./listUsersCtrl.js');
require('./loginCtrl.js');
require('./registerCtrl.js');
require('./questionAddCtrl.js');
require('./homeCtrl.js');
require('./navbarCtrl.js');
require('./listQuestionsCtrl.js');
require('./router.js');
require('./authOnStateChange.js');
require('./logOnStateChange.js');

},{"./authOnStateChange.js":1,"./frontpageCtrl.js":2,"./homeCtrl.js":3,"./listQuestionsCtrl.js":5,"./listUsersCtrl.js":6,"./logOnStateChange.js":7,"./loginCtrl.js":8,"./main.js":9,"./navbarCtrl.js":10,"./questionAddCtrl.js":11,"./questionFactory.js":12,"./questionListFactory.js":13,"./registerCtrl.js":14,"./router.js":15,"./userFactory.js":16,"./userListFactory.js":17}],5:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.controller('ListQuestionsCtrl', function ($scope, $state, questionsList, user) {
    if (!user.isLoggedIn()) {
      $state.go('login');
    }

    $scope.getQuestions = function () {
      return questionsList.getAllQuestions();
    };

    questionsList.fetchAllQuestions();
  });

},{"./main":9}],6:[function(require,module,exports){
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

},{"./main":9}],7:[function(require,module,exports){
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

},{"./main":9}],8:[function(require,module,exports){
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

},{"./main":9}],9:[function(require,module,exports){
'use strict';

var EPAM = angular.module('epamInterviewer', ['ui.router']);

module.exports = EPAM;

},{}],10:[function(require,module,exports){
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

},{"./main":9}],11:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.controller('QuestionCtrl', function ($scope, $state, question, user) {
    if (!user.isLoggedIn() || !user.isAdmin()) {
      $state.go('login');
    }

    $scope.questionSend = function (content, type) {
      question.addNewQuestion({
        content: content,
        type: type,
      })
      .then(handleSuccess)
      .catch(handleError);
    };

    function handleSuccess() {
      $state.go('questions');
    }

    function handleError(error) {
      $scope.Error = error.data;
    }
  });

},{"./main":9}],12:[function(require,module,exports){
'use strict';

var EPAM = require('./main');

EPAM.factory('question', function ($http) {
    var question = {
      content: '',
      type: '',
    };

    function addNewQuestion(newQuestion) {
      return $http.post('/api/questions', newQuestion);
    }

    return {
      addNewQuestion: addNewQuestion,
    };
  });

},{"./main":9}],13:[function(require,module,exports){
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

    return {
      getAllQuestions: getAllQuestions,
      fetchAllQuestions: fetchAllQuestions,
    };
  });

},{"./main":9}],14:[function(require,module,exports){
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

},{"./main":9}],15:[function(require,module,exports){
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
      .state('questionadd', {
        url: '/questions/new',
        templateUrl: './templates/questionadd.html',
        controller: 'QuestionCtrl',
        data: {
          pageTitle: 'Add Question',
        },
      })
      .state('users', {
        url: '/users',
        templateUrl: './templates/users.html',
        data: {
          pageTitle: 'Users',
        },
      })
      .state('questions', {
        url: '/questions',
        templateUrl: './templates/questionsList.html',
        data: {
          pageTitle: 'Questions',
        },
      });
  });

},{"./main":9}],16:[function(require,module,exports){
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

},{"./main":9}],17:[function(require,module,exports){
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

},{"./main":9}]},{},[4]);
