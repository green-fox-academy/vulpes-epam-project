'use strict';

function createTemplateController(queries) {

  function getAllTemplates(req, res) {
    queries.getTemplates(function (err, result) {
      handleResponse(err, result, res);
    });
  }

  function postTemplate(req, res) {
    queries.postTemplate(req.body, function (err, result, response) {
      if (err) {
        response.status(503).json({
          errorMessage: 'Database error. Please try again later.',
        });
      } else {
        queries.postTemplateSetup(req.body, function (err, result) {
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
        .then(sortQuestionsSchema)
        .then((questions) => {
          res.status(200).json(questions);
        });
      }
    });
  }

  function sortQuestionsSchema(result) {
    var schema = {
      questions: [],
      status: 'ok',
    };
    result.forEach((type) => {
      type.forEach((question) => {
        schema.questions.push(question);
      });
    });
    return schema;
  }

  function handleResponse(err, result, response) {
    if (err) {
      response.status(503).json({
        errorMessage: 'Database error. Please try again later.',
      });
    } else {
      response.status(200).json(sortResponseSchema(result));
    }
  }

  function sortResponseSchema(result) {
    let templates = [];
    let schema = [];
    let id = '';
    let title = '';

    result.rows.forEach(function (row) {
      if (id === '') {
        id = row.templateid;
        title = row.title;
        schema.push({ type: row.type, count: row.count, });
      } else if (id === row.templateid) {
        schema.push({ type: row.type, count: row.count, });
      } else {
        templates.push({
          id: id,
          title: title,
          schema: schema,
        });
        id = row.templateid;
        title = row.title;
        schema = [];
        schema.push({ type: row.type, count: row.count, });
      }
    });

    templates.push({
      id: id,
      title: title,
      schema: schema,
    });
    let output = {
      templates: templates,
      status: 'ok',
    };
    return output;
  }

  return {
    getAllTemplates: getAllTemplates,
    postTemplate: postTemplate,
    getTemplateQuestions: getTemplateQuestions,
  };
}

module.exports = createTemplateController;
