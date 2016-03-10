'use strict';

var SQL = require('sql-template-strings');

function createTemplateQueries(connection) {

  function getTemplates(callback) {
    connection.sendQuery(
      SQL`
      SELECT * FROM templates
      inner join template_setup on
      (templates.templateId=template_setup.templateId);`,
      callback);
  }

  function getOneTemplate(id, callback) {
    connection.sendQuery(
      SQL`
      SELECT * FROM templates
      inner join template_setup on
      (templates.templateId=template_setup.templateId)
      where templates.templateId=${id};`,
      callback);
  }

  function postTemplate(params, callback) {
    connection.sendQuery(
      SQL`
      INSERT INTO templates (title)
      VALUES (${params.title});
      INSERT INTO template_setup (templateId, type, count)
      VALUES ((SELECT templateId FROM templates WHERE title = ${params.title}),
      ${params.type},${params.count});
      `,
      callback);
  }

  return {
    getTemplates: getTemplates,
    getOneTemplate: getOneTemplate,
    postTemplate: postTemplate,
  };
}

module.exports = createTemplateQueries;
