'use strict';

function createTemplateController(queries) {

  function getAllTemplates(req, res) {
    queries.getTemplates(function (err, result) {
      handleResponse(err, result, res);
    });
  }

  function handleResponse(err, result, response) {
    if (err) {
      response.status(503).json({
        errorMessage: 'Database error. Please try again later.',
      });
    } else {
      response.status(200).json(responseSchema(result));
    }
  }

  function responseSchema(result) {
    var resultObject = {
      templates: [],
      status:'ok',
    };
    result.rows.map((temp) => {
      var template = {
        id: temp.templateid,
        title: temp.title,
        questions: [],
      };
      if (resultObject.templates.indexOf(template) === -1) {
        resultObject.templates.push(template);
      }

      return temp;
    });
    console.log(resultObject);
    return resultObject;
  }

  return {
    getAllTemplates: getAllTemplates,
  };
}

module.exports = createTemplateController;
