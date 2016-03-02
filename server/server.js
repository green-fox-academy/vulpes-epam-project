'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var config = require('./config.js');
var createHeartbeatQuery = require('./heartbeat/heartbeat-query.js'); //miért is?-----
var createHeartbeat = require('./heartbeat/heartbeat.js');
var createUserController = require('./user/user_controller.js');
var createUserQueries = require('./user/user_queries.js');
var createAuthentication = require('./user/authentication.js');
var createQuestion = require('./question/question');
var createQuestionQuery = require('./question/question_query');
var logController = require('./log_controller.js')();

function createServer(connection) {
  var heartQuery = createHeartbeatQuery(connection);
  var userQueries = createUserQueries(connection);
  var heartbeat = createHeartbeat(heartQuery);
  var userController = createUserController(userQueries);
  var authentication = createAuthentication(userController);
  var questionQuery = createQuestionQuery(connection);
  var question = createQuestion(questionQuery);
  var app = express();

  var route = path.join(__dirname, '..', config.PUBLIC_FOLDER_NAME);

  passport.use(authentication.createStrategy());
  passport.serializeUser(authentication.serialize);
  passport.deserializeUser(authentication.deserialize);

  app.use(logController.logRequest);
  app.use(bodyParser.json());
  app.use(express.static(route));
  app.use(cookieParser());
  app.use(expressSession(config.EXPRESS_SESSION_CONFIG));
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/heartbeat', heartbeat.getStatus);
  app.post('/api/log', logController.logFrontendEvent);
  app.get('/api/users', userController.getAllUser);
  app.put('/api/users', userController.updateUserAdmin);
  app.post('/api/register', userController.registerUser);
  app.post('/api/login', authentication.authenticateUser);
  app.get('/api/logout', authentication.sessionLogout);
  app.get('/api/user', authentication.getLoggedInUser);
  app.get('/api/questions', question.getAllQuestion);

  return app;
}

module.exports = createServer;
