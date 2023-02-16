// import dependancies
const inquirer = require("inquirer");
const { viewEmployees } = require("./lib/employee");

//Questions to be posed on application initialisation
const initQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "nextAction",
        message: "Select one of the following?",
        choices: [
        //Seperator to seperate types of action in list
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
    //Switch calls appropriate function based on response
    .then((response) => {
      switch (response.nextAction) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee":
          updateEmployee();
          break;
        default:
          console.log("Sorry, something went wrong");
          break;
      }
    });
};

//Calls initQuestions when application is initialized.
initQuestions();