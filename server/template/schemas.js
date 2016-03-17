'use strict';

function createSchemas() {
  var questionsSchema = function (result) {
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
  };

  function allTemplatesSchema(result) {
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
    questionsSchema: questionsSchema,
    allTemplatesSchema: allTemplatesSchema,
  };
}

module.exports = createSchemas;
