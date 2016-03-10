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

  return {
    getTemplates: getTemplates,
    getOneTemplate: getOneTemplate,
  };
}

module.exports = createTemplateQueries;
