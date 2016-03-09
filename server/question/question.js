'use strict';

var logger = require('../log.js')();

function createQuestion(query) {

  function getAllQuestion(request, response) {
    query.getAllQuestion(function (err, result) {
      handleResponse(err, result, response);
    });
  }

  function postQuestion(request, response) {
    query.postQuestion(request.body, function (err, result) {
      handleResponse(err, result, response);
    });
  }

  function putQuestion(request, response) {
    query.putQuestion(request.body, request.params.id, function (err, result) {
      handleResponse(err, result, response);
    });
  }

  function deleteQuestion(request, response) {
    query.deleteQuestion(request.params.id, function (err, result) {
      handleResponse(err, result, response);
    });
  }

  function handleResponse(err, result, response) {
    if (err) {
      logger.message('error', 'DATABASE CONNECTION ERROR');
      response.status(503).json({ 'Connection Error:': err });
    } else {
      logger.message('info', 'SUCCESSFUL DATABASE QUERY');
      response.status(200).json(result.rows);
    }
  }

  return {
    getAllQuestion: getAllQuestion,
    postQuestion: postQuestion,
    putQuestion: putQuestion,
    deleteQuestion: deleteQuestion,
    handleResponse: handleResponse,
  };
}

module.exports = createQuestion;
