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
    try {
      if (err.code && err.code === '23505') {
        throw userError(503, 'warn', 'This email already exists!');
      } else if (err) {
        throw userError(503, 'error', 'Database error. Please try again later.');
      } else if (result.rows.length === 0) {
        throw userError(503, 'error', 'Item not found in database');
      } else {
        logger.message('info', 'SUCCESSFUL DATABASE QUERY');
        response.status(200).json(result.rows);
      }
    } catch (error) {
      logger.message(error.level, error.message);
      response.status(error.status).json(error);
    }
  }

  function userError(status, level, message) {
    return {
      status: status,
      level: level,
      message: message,
    };
  }

  return {
    registerUser: registerUser,
    updateUserAdmin: updateUserAdmin,
    getAllUser: getAllUser,
  };

}

module.exports = createUserController;
