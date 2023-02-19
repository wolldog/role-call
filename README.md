# role-call

## Description

Role-Call is a command line application to maintain your staff database. 

## Installation

The application requires Node.js and MySQL to be installed on your local machine. 

Clone the project folder from GitHub to your local machine.  Navigate to the project folder and open a terminal window.

To load the database; navigate to the ./db folder and log into MySQL by typing `mysql -u <username> -p` and entering your password. Type `source schema.sql` + <kbd>Enter</kbd> followed by `seeds.sql` + <kbd>Enter</kbd>. Once this is complete you can `quit` mysql.

Run `npm install` from the command line ensuring you are in the folder with index.js file. This will install the dependencies; inquirer v8.2.4, mysql2 v2.2.5 and console.table v0.10.0. 

## Usage

Type 'npm start' from the command line. You will be presented with a menu of options to choose from. 

![init-menu](https://user-images.githubusercontent.com/110208272/219264056-b2237fab-7e58-4ac1-a96b-357144a89f79.png)

Select an option to begin.

The VIEW options will display one of the following:

- Departments - department ID & department name;
- Roles - role ID, role title, department name & salary;
- Employee - employee id, first name, last name, role, department, salary and manager (if applicable).

### Example screen (employees portrayed are fictional!)

![View All Employees](https://user-images.githubusercontent.com/110208272/219263504-2fb4d4ef-bdaf-4782-93b1-2d8ed8717bdd.png)

The ADD options will allow you to add either a new department, role or employee by asking the relevant questions.

The UPDATE option enables you to update the employee's role by presenting you with a list of all employees from which to select the one that should be updated. You are presented with a list of roles to choose from.

After each action is complete you can choose to continue or quit the application.

### Role-Call Demo

https://user-images.githubusercontent.com/110208272/219905059-c4cd95e2-7902-4c75-8488-3f5fe5cf6384.mp4

## License

N/A

## Tests

N/A

## Questions

  If you have questions regarding the Role-Call application,
  you can contact me directly by email at lydiawallis@live.co.uk or reach out
  to me on GitHub at https://www.github.com/wolldog.





