//File holds employee VIEW/ADD/UPDATE functions

//Import dependancies
const inquirer = require("inquirer");
const db = require("../db/config");
const { displayResult } = require("./utils");

// View all employees, include joins to roles and department tables
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
  //Add a new employee
  const addEmployee = (nextAction) => {
    //variables declared to hold results of database queries
    let managers;
    let roles;
  
    //queries names of all employess who's ID's are also listed as managers and stores in variable managers
    db.query(
      `SELECT id, CONCAT(first_name, ' ', last_name) AS Managers FROM employee
      WHERE id IN (SELECT manager_id FROM employee)`,
      function (err, result) {
        managers = result.map((manager) => ({
          value: manager.id,
          name: manager.Managers,
        }));
        //queries all roles and stores in variable roles
        db.query(`SELECT id, title AS role FROM roles`, function (err, result) {
          roles = result.map((role) => ({ value: role.id, name: role.role }));
  
          inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "Enter the new employee's first name",
              },
              {
                type: "input",
                name: "last_name",
                message: "Enter the new employee's last name",
              },
              //user selects employees role from choice of roles from variable 'roles'
              {
                type: "list",
                name: "role",
                message: "Select the new employee's role",
                choices: roles,
              },
              //User confirms whether or not the employee will have a manager
              {
                type: "confirm",
                name: "confirm",
                message: "Does this employee have a manager?",
              },
              //If user confirms the new employee will have a manager...
              //User selects employees manager from choice of managers from variable 'managers'
              {
                type: "list",
                name: "manager",
                message: "Select the new employee's manager",
                choices: managers,
                when: (answers) => answers.confirm === true,
              },
            ])
            .then((response) => {
              console.table(response);
  
              db.query(
                `INSERT INTO employee SET ?`,
                {
                  first_name: response.first_name,
                  last_name: response.last_name,
                  role_id: response.role,
                  manager_id: response.manager,
                },
                (err, result) => {
                  if (err) {
                    throw err;
                  } else {
                    console.log(`Successfully added ${response.first_name}`);
                    nextAction();
                  }
                }
              );
            });
        });
      }
    );
  };

  //Function to update employee role
const updateEmployee = (nextAction) => {
  let employees;
  let roles;

  db.query(
    `SELECT id, CONCAT(first_name, ' ', last_name) AS "Employees" FROM employee`,
    function (err, result) {
      if (!err) {
        employees = result.map((employee) => ({
          value: employee.id,
          name: employee.Employees,
        }));
      } else {
        throw err;
      }

      db.query(`SELECT id, title FROM roles`, function (err, result) {
        if (!err) {
          roles = result.map((role) => ({
            value: role.id,
            name: role.title,
          }));
        } else {
          throw err;
        }

        inquirer
          .prompt([
            {
              type: "list",
              name: "id",
              message: "Which employee would you like to update?",
              choices: employees,
            },
            {
              type: "list",
              name: "role_id",
              message: "What is the employees new role?",
              choices: roles,
            },
          ])
          .then((response) => {
            db.query(
              `UPDATE employee SET ? WHERE ?`,
              [
                {
                  role_id: response.role_id,
                },
                {
                  id: response.id,
                },
              ],
              (err) => {
                if (err) {
                  throw err;
                } else {
                  console.log(`Successfully updated role`);
                  nextAction();
                }
              }
            );
          });
      });
    }
  );
};

  module.exports = {
    viewEmployees,
    addEmployee,
    updateEmployee
  };