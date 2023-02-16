//File holds roles VIEW/ADD/UPDATE functions

//Import dependancies
const db = require("../db/config");
const { displayResult } = require("./utils");

const viewRoles = (nextAction) => {
    const sql = `SELECT roles.title, roles.id, department.name, roles.salary
      FROM roles
      INNER JOIN department ON department.id = roles.department_id
      ORDER BY roles.title;`;
    displayResult(sql, nextAction);
  };

  module.exports = {
    viewRoles,
    
  };