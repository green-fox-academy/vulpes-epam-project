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

  function postTemplateSetup(params, title, callback) {
    connection.sendQuery(
      SQL`
      INSERT INTO template_setup (templateId, type, count)
      VALUES ((SELECT templateId
      FROM templates WHERE title = ${title}),
      ${params.type},${params.count});
      `,
      callback);
  }

  function deleteTemplate(id, callback) {
    connection.sendQuery(
      SQL`
      DELETE FROM templates WHERE templateId= ${id};`,
      callback);
  }

  function deleteTemplateSetup(id, callback) {
    connection.sendQuery(
      SQL`
      DELETE FROM template_setup WHERE templateId= ${id};`,
      callback);
  }

  return {
    getTemplates: getTemplates,
    getOneTemplate: getOneTemplate,
    postTemplate: postTemplate,
    postTemplateSetup: postTemplateSetup,
    deleteTemplate: deleteTemplate,
    deleteTemplateSetup: deleteTemplateSetup,
  };
}

module.exports = createTemplateQueries;
