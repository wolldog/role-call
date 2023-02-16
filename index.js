// import dependancies
const inquirer = require("inquirer");
const { viewDepartments } = require("./lib/department");
const { viewEmployees } = require("./lib/employee");
const { viewRoles } = require("./lib/roles");

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
          viewDepartments(nextAction);
          break;
        case "View all roles":
          viewRoles(nextAction);
          break;
        case "View all employees":
          viewEmployees(nextAction);
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

//Function to ask user if they would like
//continue using role-call or exit
const nextAction = () => {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "continue",
          message: "Would you like to continue?",
        },
      ])
      //if user responds 'Y' function calls initQuestions
      .then((response) => {
        if (response.continue === true) {
          initQuestions();
        //if user responds 'N' application closes with thank you message.
        } else {
          console.log("Thank you for using EmployTrak!");
          process.exit();
        }
      });
  };

//Calls initQuestions when application is initialized.
initQuestions();