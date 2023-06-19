const inquirer = require("inquirer");
const db = require("./db/index");
const mysql = require("mysql2");

mainMenu();

const hello = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "3Gd5znfc!9",
    database: "employees_db",
  },

  console.log(`Connected to the employees_db database.`)
);

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
    console.log(deptsChoices);
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
  db.viewAllEmployees().then(([employeeData]) => {
    const managerChoice = employeeData.map(({ id, first_name, last_name }) => ({
      value: id,
      name: first_name + " " + last_name,
    }));
    db.viewAllRoles().then(([roleData]) => {
      const roleChoice = roleData.map(({ id, title }) => ({
        value: id,
        name: title,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the employees first name?",
            name: "first_name",
          },
          {
            type: "input",
            message: "What is the employees last name?",
            name: "last_name",
          },
          {
            type: "list",
            message: "What is the employees role?",
            name: "role_id",
            choices: roleChoice,
          },
          {
            type: "list",
            message: "Who is the employees manager?",
            name: "manager_id",
            choices: managerChoice,
          },
        ])
        .then((response) => {
          console.log(response);
          db.addToEmployees(response)
            .then(() => {
              console.log(`${response.first_name} employee added`);
              mainMenu();
            })
            .catch((err) => console.log(err));
        });
    });
  });
}

// function updateEmployeeRole() {
//   db.viewAllEmployees().then(([employeeData]) => {
//     const employeeChoice = employeeData.map({ first_name, last_name, id })})};
//     const roleChoice = employeeData.map(({ title, id }) => ({ id, value: title,}));
//       inquirer
//         .prompt([
//           {
//             type: "list",
//             message: "Which employee is being updated?",
//             name: "",
//             choices: employeeChoice,
//           },
//           {
//             type: "list",
//             message: "Which role are they being assigned?",
//             name: "role",
//             choices: roleChoice,
//           }

//         ])
//         .then((response) => {
//           let role_id, manager_id;
//           for (let i = 0; i < roleChoice.length; i++) {
//             if (response.role == roleChoice[i].value) role_id = i + 1;
//           }
//           for (let i = 0; i < managerChoice.length; i++) {
//             if (response.manager == managerChoice[i].name) manager_id = i + 1;
//           }
//           hello.query(
//             `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', ${role_id}, ${manager_id})`,
//             (err, response) => {
//               if (err) console.log(err);
//               else console.log(viewAllEmployees());
//             }
//           );
//         });
