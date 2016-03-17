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
        templateUrl: './templates/questions/questionsList.html',
        data: {
          pageTitle: 'Questions',
        },
      })
      .state('templates', {
        url: '/templates',
        templateUrl: './templates/templates/templateList.html',
        controller: 'ListTemplatesCtrl',
        data: {
          pageTitle: 'Templates',
        },
      })
      .state('newTemplate', {
        url: '/templates/new',
        templateUrl: './templates/templates/newtemplate.html',
        controller: 'NewTemplateCtrl',
        data: {
          pageTitle: 'Add new template',
        },
      })
      .state('newInterview', {
        url: '/interview/new',
        templateUrl: './templates/interview/new.html',
        controller: 'NewInterviewCtrl',
        data: {
          pageTitle: 'Start new interview',
        },
      })
      .state('interview', {
        url: '/interview',
        templateUrl: './templates/interview/interview.html',
        controller: 'InterviewCtrl',
        data: {
          pageTitle: 'Interview',
        },
      });
  });
