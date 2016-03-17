'use strict';

var router = require('express').Router();

var createHeartbeatQuery = require('./heartbeat/heartbeat_query.js');
var createHeartbeat = require('./heartbeat/heartbeat.js');
var createUserController = require('./user/user_controller.js');
var createUserQueries = require('./user/user_queries.js');
var authController = require('./user/auth_controller.js')();
var createQuestion = require('./question/question');
var createQuestionQuery = require('./question/question_query');
var createTemplateQuery = require('./template/template_queries.js');
var createTemplateController = require('./template/template_controller.js');
var logController = require('./log_controller.js')();

function createRouter(connection) {
  var heartQuery = createHeartbeatQuery(connection);
  var userQueries = createUserQueries(connection);
  var heartbeat = createHeartbeat(heartQuery);
  var userController = createUserController(userQueries);
  var questionQuery = createQuestionQuery(connection);
  var question = createQuestion(questionQuery);
  var templateQuery = createTemplateQuery(connection);
  var templateController = createTemplateController(templateQuery);

  router.get('/heartbeat', heartbeat.getStatus);
  router.post('/api/log', logController.logFrontendEvent);
  router.get('/api/users', authController.checkAdminRights, userController.getAllUser);
  router.put('/api/users', userController.updateUserAdmin);
  router.post('/api/register', userController.registerUser);
  router.post('/api/login', authController.authenticateUser);
  router.get('/api/logout', authController.sessionLogout);
  router.get('/api/user', authController.getLoggedInUser);
  router.get('/api/questions', question.getAllQuestion);
  router.post('/api/questions', question.postQuestion);
  router.put('/api/questions/:id', question.putQuestion);
  router.delete('/api/questions/:id', question.deleteQuestion);
  router.get('/api/templates', templateController.getAllTemplates);
  router.post('/api/templates', templateController.postTemplate);
  router.get('/api/interview/:id', templateController.getTemplateQuestions);

  return router;
}

module.exports = createRouter;
