'use strict';

var passport = require('passport');

function authentication(userController) {

  function authenticateUser(req, res) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        res.status(503).send(info);
      } else if (user) {
        userController.loginUser(req, res, user);
      } else {
        res.status(401).send(info);
      }
    })(req, res);
  }

  function sessionLogout(req, res) {
    if (req.isAuthenticated()) {
      req.logout();
      res.status(200).send('Successful logout');
    } else {
      res.status(500).send('Nobody logged in');
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
    authenticateUser: authenticateUser,
    sessionLogout: sessionLogout,
    getLoggedInUser: getLoggedInUser,
  };

}

module.exports = authentication;
