'use strict';

var logger = require('../log.js')();
var encrypt = require('./encrypt_service.js')();
var authentication = require('./auth_controller.js')();

function createUserController(queries) {

  function newUser(req) {
    var hash = encrypt.generateHash(req.body.password);
    return {
      email: req.body.email,
      password: hash,
    };
  }

  function registerUser(req, res) {
    var user = newUser(req);
    queries.registNewUser(user, function (err, registeredUser) {
      if (err) {
        handleResponse(err, null, res);
      } else {
        authentication.loginUser(req, res, registeredUser);
      }
    });
  }

  function updateUserAdmin(req, response) {
    queries.updateUserAdminStatus(req.body, function (err, result) {
      handleResponse(err, result, response);
    });
  }

  function getAllUser(req, response) {
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

  return {
    registerUser: registerUser,
    updateUserAdmin: updateUserAdmin,
    getAllUser: getAllUser,
  };

}

module.exports = createUserController;
