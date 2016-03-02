'use strict';

var logger = require('../log.js')();

function createUserController(queries) {

  function registerUser(request, response) {
    queries.registNewUser(request.body, function (err, result) {
      if (err) {
        handleResponse(err, result, response);
      } else {
        var user = result.rows[0];
        loginUser(request, response, user);
      }
    });
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

  function findUser(email, cb) {
    queries.findUser(email, function (err, result) {
      if (err) return cb(err);
      var foundUser = result.rows[0];
      if (foundUser) return cb(null, foundUser);
      return cb(null, null);
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

  return {
    registerUser: registerUser,
    loginUser: loginUser,
    updateUserAdmin: updateUserAdmin,
    getAllUser: getAllUser,
    findUser: findUser,
  };

}

module.exports = createUserController;
