'use strict';

var logger = require('../log.js')();

function createQuestion(query) {

  function getAllQuestion(request, response) {
    console.log('mi a szar');
    query.getAll(function (err, result) {
      handleResponse(err, result, response);
    });
  }

  function handleResponse(err, result, response) {
    if (err) {
      logger.message('error', 'DATABASE CONNECTION ERROR');
      response.status(503).json({ 'Connection Error:': err });
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
    getAllQuestion: getAllQuestion,
    handleResponse: handleResponse,
  };
}

module.exports = createQuestion;
