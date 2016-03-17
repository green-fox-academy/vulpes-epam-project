'use strict';

function createTemplateController(queries) {
  var schema = require('./schemas.js')();

  function getAllTemplates(req, res) {
    queries.getTemplates(function (err, result) {
      handleResponse(err, result, res);
    });
  }

  function postTemplate(req, res) {
    var errorMessage = false;
    queries.postTemplate(req.body, function (err, result, response) {
      if (err) {
        response.status(503).json({
          errorMessage: 'Database error. Please try again later.',
        });
      } else {
        req.body.schema.forEach(function (elem) {
          queries.postTemplateSetup(elem, req.body.title, function (err) {
            if (err)
              errorMessage = true;
          });
        });

        postHandleResponse(errorMessage, 'Post ok', res);
      }
    });
  }

  function deleteTemplate(req, res) {
    queries.deleteTemplate(req.params.id, function (err, result, response) {
      if (err) {
        response.status(503).json({
          errorMessage: 'Database error. Please try again later.',
        });
      } else {
        queries.deleteTemplateSetup(req.params.id, function (err, result) {
          handleResponse(err, result, res);
        });
      }
    });
  }

  function getTemplateQuestions(req, res) {
    queries.getTemplateSetup(req.params.id, function (err, result) {
      if (err) {
        res.status(503).json({
          errorMessage: 'Database error. Please try again later.',
        });
      } else {
        var generatedQuestions = [];
        result.rows.forEach((questionTypes) => {
          generatedQuestions.push(
            new Promise((resolve) => {
              queries.getQuestions(questionTypes.type, questionTypes.count,
                (err, qResult) => {
                  if (err) throw err;
                  resolve(qResult.rows);
                });
            }));
        });
        Promise.all(generatedQuestions)
        .then(schema.questionsSchema)
        .then((questions) => {
          res.status(200).json(questions);
        });
      }
    });
  }

  function handleResponse(err, result, response) {
    if (err) {
      response.status(503).json({
        errorMessage: 'Database error. Please try again later.',
      });
    } else {
      response.status(200).json(schema.allTemplatesSchema(result));
    }
  }

  function postHandleResponse(err, result, response) {
    if (err) {
      response.status(503).json({
        errorMessage: 'Database error. Please try again later.',
      });
    } else {
      response.status(200).json(result);
    }
  }

  return {
    getAllTemplates: getAllTemplates,
    postTemplate: postTemplate,
    getTemplateQuestions: getTemplateQuestions,
    deleteTemplate: deleteTemplate,
  };
}

module.exports = createTemplateController;
