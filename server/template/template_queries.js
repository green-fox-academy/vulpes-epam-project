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

  function getTemplateSetup(id, callback) {
    connection.sendQuery(
      SQL`
      SELECT type, count
      FROM template_setup
      WHERE templateId=${id};`,
      callback);
  }

  function getQuestions(type, count, callback) {
    connection.sendQuery(
      SQL`
      SELECT question_id, type, content FROM questions
      WHERE type=${type}
      ORDER BY RANDOM() LIMIT ${count};`,
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

  function putTemplate(id, params, callback) {
    connection.sendQuery(
      SQL`
      UPDATE templates SET title = ${params.title}
      WHERE templateId = ${id};
      `,
      callback);
  }

  function putTemplateSetup(id, params, callback) {
    connection.sendQuery(
      SQL`
      UPDATE template_setup SET
      type = ${params.type}, count = ${params.count}
      WHERE templateId = ${id};
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
    getTemplateSetup: getTemplateSetup,
    postTemplate: postTemplate,
    postTemplateSetup: postTemplateSetup,
    putTemplate: putTemplate,
    putTemplateSetup: putTemplateSetup,
    getQuestions: getQuestions,
    deleteTemplate: deleteTemplate,
    deleteTemplateSetup: deleteTemplateSetup,
  };
}

module.exports = createTemplateQueries;
