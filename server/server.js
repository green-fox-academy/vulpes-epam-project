'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var config = require('./config.js');
var logController = require('./log_controller.js')();
var createUserQueries = require('./user/user_queries.js');
var createAuthService = require('./user/auth_service.js');
var createRouter = require('./routes.js');

function createServer(connection) {
  var userQueries = createUserQueries(connection);
  var authService = createAuthService(userQueries);
  var router = createRouter(connection);

  var app = express();
  var route = path.join(__dirname, '..', config.PUBLIC_FOLDER_NAME);

  passport.use(authService.createStrategy());
  passport.serializeUser(authService.serialize);
  passport.deserializeUser(authService.deserialize);

  app.use(logController.logRequest);
  app.use(bodyParser.json());
  app.use(express.static(route));
  app.use(cookieParser());
  app.use(expressSession(config.EXPRESS_SESSION_CONFIG));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/', router);

  return app;
}

module.exports = createServer;
