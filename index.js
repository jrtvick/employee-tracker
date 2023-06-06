const inquirer = require("inquirer");
const db = require("./db");

inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: ['View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role'
    ],
    }
  ])
  .then((answers) => {
    console.log('log me');
  });

function viewAllDepartments() {
  db.viewAllDepartments()
    .then((data) => {
      console.log("hello");
      console.log(data);
    })
    .catch((err) => console.log(err));
};
