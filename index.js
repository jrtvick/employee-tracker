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
    switch (answers.action) {
      case 'View all departments': 
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
    }
  });

function viewAllDepartments() {
  db.viewAllDepartments()
    .then(([data]) => {
      console.table(data);
    })
    .catch((err) => console.log(err));
};

function viewAllRoles() {
  db.viewAllRoles()
    .then(([data]) => {
      console.table(data);
    })
    .catch((err) => console.log(err));
};

function viewAllEmployees() {
  db.viewAllEmployees()
    .then(([data]) => {
      console.table(data);
    })
    .catch((err) => console.log(err));
};
