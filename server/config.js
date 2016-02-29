'use strict';

module.exports = {
  DEFAULT_PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL ||
    'postgres://postgres:postgres@localhost/epam_interviewer',
  DEFAULT_LOGGING_LEVEL: process.env.DEFAULT_LOGGING_LEVEL || 'debug',
  EXPRESS_SESSION_CONFIG: {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  },
  PASSPORT_CONFIG: {
    usernameField: 'email',
    passwordField: 'password',
  },
};
