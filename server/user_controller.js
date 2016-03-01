'use strict';

var logger = require('./log.js')();
var passport = require('passport');

function createUserController(queries) {

  function registerUser(request, response) {
    queries.registNewUser(request.body, function (err, result) {
      if (err) {
        handleResponse(err, result, response);
      } else {
        loginUser(request, response);
      }
    });
  }

  function updateUserAdmin(request, response) {
    queries.updateUserAdminStatus(request.body, function (err, result) {
      handleResponse(err, result, response);
    });
  }

  function getAllUser(request, response) {
    queries.getUsers(function (err, result) {
      handleResponse(err, result, response);
    });
  }

  function handleResponse(err, result, response) {
    if (err) {
      logger.message('error', err.toString());
      if (err.code === '23505') {
        response.status(503).json({
          errorMessage: 'This email already exists!',
        });
      } else {
        response.status(503).json({
          errorMessage: 'Database error. Please try again later.',
        });
      }
    } else {
      if (result.rows.length === 0) {
        logger.message('warn', 'ITEM NOT FOUND IN DATABASE');
        response.status(404).json(result.rows);
      } else {
        logger.message('info', 'SUCCESSFUL DATABASE QUERY');
        response.status(200).json(result.rows);
      }
    }
  }

  function authenticateUser(username, password, done) {
    findUser(username, function (err, user) {
      if (err) {
        return done(err, false, 'Connection error');
      } else if (!user) {
        return done(null, false, 'Incorrect username');
      } else if (user.password !== password) {
        return done(null, false, 'Incorrect password');
      } else {
        return done(null, user);
      }
    });
  }

  function loginUser(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        res.status(503).send(info);
      } else if (user) {
        req.logIn(user, function (err) {
          if (err) return next(err);
          return res.status(200).json({
            email: user.email,
            isadmin: user.isadmin,
          });
        });
      } else {
        res.status(401).send(info);
      }
    })(req, res, next);
  }

  function findUser(email, cb) {
    queries.findUser(email, function (err, result) {
      if (err) return cb(err);
      var foundUser = result.rows[0];
      if (foundUser) return cb(null, foundUser);
      return cb(null, null);
    });
  }

  function serialize(user, cb) {
    cb(null, user.email);
  }

  function deserialize(email, done) {
    findUser(email, function (err, user) {
      done(err, user);
    });
  }

  function sessionLogout(req, res) {
    if (!req.isAuthenticated()) {
      res.status(500).send('Nobody logged in');
    } else {
      req.logout();
      res.status(200).send('Successful logout');
    }
  }

  function getLoggedInUser(req, res) {
    if (req.isAuthenticated()) {
      res.status(200).send({
        email: req.user.email,
        isadmin: req.user.isadmin,
      });
    } else {
      res.status(204).send('No user in session');
    }
  }

  return {
    registerUser: registerUser,
    updateUserAdmin: updateUserAdmin,
    getAllUser: getAllUser,
    authenticateUser: authenticateUser,
    loginUser: loginUser,
    serialize: serialize,
    deserialize: deserialize,
    sessionLogout: sessionLogout,
    getLoggedInUser: getLoggedInUser,
  };

}

module.exports = createUserController;
