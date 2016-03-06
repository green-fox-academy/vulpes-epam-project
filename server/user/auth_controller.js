'use strict';

var passport = require('passport');

function authController() {

  function authenticateUser(req, res) {
    passport.authenticate('local', function (err, user) {
      if (err) return res.status(err.status).json(err);
      return loginUser(req, res, user);
    })(req, res);
  }

  function loginUser(req, res, user) {
    req.logIn(user, function (err) {
      if (err) return res.status(500);
      return res.status(200).json({
        email: user.email,
        isadmin: user.isadmin,
      });
    });
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

  function checkAdminRights(req, res, next) {
    if (req.user && req.user.isadmin) {
      next();
    } else {
      res.status(401).send('You do not have permission to access this page.');
    }
  }

  function sessionLogout(req, res) {
    if (req.isAuthenticated()) {
      req.logout();
      res.status(200).send('Successful logout');
    } else {
      res.status(500).send('Nobody logged in');
    }
  }

  return {
    authenticateUser: authenticateUser,
    loginUser: loginUser,
    getLoggedInUser: getLoggedInUser,
    checkAdminRights: checkAdminRights,
    sessionLogout: sessionLogout,
  };

}

module.exports = authController;
