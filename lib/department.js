//File holds department VIEW/ADD/UPDATE functions

//Import dependancies
const inquirer = require("inquirer");
const db = require("../db/config");
const { displayResult } = require("./utils");

//Query to display all department ids' & names;
const viewDepartments = (nextAction) => {
    const sql = `SELECT id AS ID, name AS "Department" from department;`;
    displayResult(sql, nextAction);
  };

//
const addDepartment = (nextAction) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept",
        message: "Enter the name of the new department.",
      },
    ])

    .then((response) => {
      db.query(
        `INSERT INTO department SET ?`,
        { name: response.dept },
        (err, result) => {
          if (err) {
            throw err;
          } else {
            console.log(`Successfully added new department: ${response.dept}`);
            db.query(
              `SELECT * from department WHERE id=(SELECT max(id) FROM department)`,
              (err, results) => {
                console.table(results);
                nextAction();
              }
            );
          }
        }
      );
    });
};

  //Exports modules for use in index.js
  module.exports = {
    viewDepartments,
    addDepartment
  };