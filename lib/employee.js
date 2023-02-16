//File holds employee VIEW/ADD/UPDATE functions

//Import dependancies
const db = require("../db/config");
const { displayResult } = require("./utils");


const viewEmployees = (nextAction) => {
    const sql = `SELECT e.id AS ID, e.first_name AS "First Name",
      e.last_name AS "Last Name", roles.title AS Role, department.name AS "Dept",
      roles.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name)AS Manager
      FROM employee as e
      LEFT JOIN employee as m ON e.manager_id = m.id
      JOIN roles ON roles.id = e.role_id
      JOIN department ON department.id = roles.department_id
      ORDER BY id`;
    displayResult(sql, nextAction);
  };

  module.exports = {
    viewEmployees,
  };