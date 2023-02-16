const inquirer = require("inquirer");

const initQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "nextAction",
        message: "Select one of the following?",
        choices: [
          new inquirer.Separator("*** VIEW ***"),
          "View all departments",
          "View all roles",
          "View all employees",
          new inquirer.Separator("*** ADD ***"),
          "Add a department",
          "Add a role",
          "Add an employee",
          new inquirer.Separator("*** UPDATE ***"),
          "Update an employee",
          new inquirer.Separator(),
        ],
      },
    ])
    .then((response) => {
      switch (response) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all roles":
          viewEmployees();
          break;
        case "View all roles":
          addDepartment();
          break;
        case "View all roles":
          addRole();
          break;
        case "View all roles":
          addEmployee();
          break;
        case "View all roles":
          updateEmployee();
          break;
        default:
          console.log("Sorry, something went wrong");
          break;
      }
    });
};
