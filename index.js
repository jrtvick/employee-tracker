const inquirer = require("inquirer");
const db = require("./db");

mainMenu();

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addToDepartments();
          break;
        case "Add a role":
          addToRoles();
          break;
        case "Add an employee":
          addToEmployees();
          break;
        case "Exit":
          process.exit();
      }
    });
}

function viewAllDepartments() {
  db.viewAllDepartments()
    .then(([data]) => {
      console.table(data);
      mainMenu();
    })
    .catch((err) => console.log(err));
}

function viewAllRoles() {
  db.viewAllRoles()
    .then(([data]) => {
      console.table(data);
      mainMenu();
    })
    .catch((err) => console.log(err));
}

function viewAllEmployees() {
  db.viewAllEmployees()
    .then(([data]) => {
      console.table(data);
      mainMenu();
    })
    .catch((err) => console.log(err));
}

function addToDepartments() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you wish to add?",
        name: "name",
      },
    ])
    .then((response) => {
      db.addToDepartments(response)
        .then(() => {
          console.log(`${response.name} deparment added`);
          mainMenu();
        })
        .catch((err) => console.log(err));
    });
}

function addToRoles() {
  db.viewAllDepartments().then(([deptsData]) => {
    const deptsChoices = deptsData.map(({ id, name }) => ({ name, value: id }));
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the job title?",
          name: "title",
        },
        {
          type: "list",
          message: "Which department does the job belong to?",
          name: "department_id",
          choices: deptsChoices,
        },
        {
          type: "input",
          message: "What is the salary for this position?",
          name: "salary",
        },
      ])
      .then((response) => {
        console.log(response);
        db.addToRoles(response)
          .then(() => {
            console.log(`${response.title} role added`);
            mainMenu();
          })
          .catch((err) => console.log(err));
      });
  });
}

function addToEmployees() {
  db.addToEmployees()
    .then(([data]) => {
      console.table(data);
      mainMenu();
    })
    .catch((err) => console.log(err));
}
