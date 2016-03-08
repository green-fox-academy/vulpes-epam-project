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

  function getOneTemlate(id, callback) {
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
    getOneTemlate: getOneTemlate,
  };
}

module.exports = createTemplateQueries;
