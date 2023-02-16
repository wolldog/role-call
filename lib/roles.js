//File holds roles VIEW/ADD/UPDATE functions

//Import dependancies
const db = require("../db/config");
const inquirer = require("inquirer")
const { displayResult } = require("./utils");

const viewRoles = (nextAction) => {
  const sql = `SELECT roles.id AS "ID", roles.title AS "Title", department.name AS "Department", roles.salary AS "Salary"
      FROM roles
      INNER JOIN department ON department.id = roles.department_id;`;
  displayResult(sql, nextAction);
};

const addRole = (nextAction) => {
  let depts;

  db.query(
    `SELECT id, name AS "Department" FROM department`,
    function (err, result) {
      if (!err) {
        depts = result.map((department) => ({
          value: department.id,
          name: department.Department,
        }));
      } else {
        throw err;
      }

      inquirer
        .prompt([
          {
            type: "input",
            name: "role",
            message: "Enter the title of the new role.",
          },
          {
            type: "input",
            name: "salary",
            message: "Enter the salary for the new role.",
          },
          {
            type: "list",
            name: "dept",
            message: "To which department does the role belong",
            choices: depts,
          },
        ])

        .then((response) => {
          db.query(
            `INSERT INTO roles SET ?`,
            {
              title: response.role,
              salary: response.salary,
              department_id: response.dept,
            },
            (err, result) => {
              if (err) {
                throw err;
              } else {
                console.log(`Successfully added ${response.role}`);
                db.query(
                  `SELECT * from roles WHERE id=(SELECT max(id) FROM roles)`,
                  (err, results) => {
                    console.table(results);
                    nextAction();
                  }
                );
              }
            }
          );
        });
    }
  );
};

module.exports = {
  viewRoles,
  addRole,
};
