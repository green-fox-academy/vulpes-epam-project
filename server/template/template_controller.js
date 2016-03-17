'use strict';

function createTemplateController(queries) {

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

  function handleResponse(err, result, response) {
    if (err) {
      response.status(503).json({
        errorMessage: 'Database error. Please try again later.',
      });
    } else {
      response.status(200).json(sortResponseSchema(result));
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
  };
}

module.exports = createTemplateController;
