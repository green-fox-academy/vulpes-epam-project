'use strict';

var SQL = require('sql-template-strings');

function createTemplateQueries(connection) {

  function getTemplates(callback) {
    connection.sendQuery(
      SQL`
      SELECT templates.templateId, templates.title, template_setup.type, template_setup.count
      FROM templates
      inner join template_setup on
      (templates.templateId=template_setup.templateId);`,
      callback);
  }

  function getOneTemplate(id, callback) {
    connection.sendQuery(
      SQL`
      SELECT templates.templateId, templates.title, template_setup.type, template_setup.count
      FROM templates
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
      `,
      callback);
  }

  function postTemplateSetup(params, callback) {
    connection.sendQuery(
      SQL`
      INSERT INTO template_setup (templateId, type, count)
      VALUES ((SELECT templateId
      FROM templates WHERE title = ${params.title}),
      ${params.type},${params.count});
      `,
      callback);
  }

  return {
    getTemplates: getTemplates,
    getOneTemplate: getOneTemplate,
    postTemplate: postTemplate,
    postTemplateSetup: postTemplateSetup,
  };
}

module.exports = createTemplateQueries;
