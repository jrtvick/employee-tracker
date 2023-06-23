const inquirer = require("inquirer");
const db = require("./db/index");

function init() {
  console.log(`
  _____                    _                           
  | ____| _ __ ___   _ __  | |  ___   _   _   ___   ___ 
  |  _|  | '_ ' _ \\ | '_ \\ | | / _ \\ | | | | / _ \\ / _ \\
  | |___ | | | | | || |_) || || (_) || |_| ||  __/|  __/
  |_____||_| |_| |_|| .__/ |_| \\___/  \\__, | \\___| \\___|
  _____            |_|    _          |___/             
  |_   _|_ __  __ _   ___ | | __ ___  _ __              
   | | | '__|/ _' | / __|| |/ // _ \\| '__|             
   | | | |  | (_| || (__ |   <|  __/| |                
   |_| |_|   \\__,_| \\___||_|\\_\\\\___||_|                
  `);
  mainMenu();
}

init();

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
        case "Update an employee role":
          updateEmployeeRole();
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
      const deptsChoice = deptsData.map(({ Department_ID, Department_Name }) => ({
        value: Department_ID,
        name: Department_Name,
      }));
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
          choices: deptsChoice,
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
            console.log(`${response.title} role has been added!`);
            mainMenu();
          })
          .catch((err) => console.log(err));
      });
  });
}

function addToEmployees() {
  db.viewAllEmployees().then(([employeeData]) => {
    const managerChoice = employeeData.map(({ Manager_ID, Manager }) => ({
      value: Manager_ID,
      name: Manager,
    }));
    db.viewAllRoles().then(([roleData]) => {
      const roleChoice = roleData.map(({ Role_ID, Role }) => ({
        value: Role_ID,
        name: Role,
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
              console.log(`${response.first_name} has been added to employees!`);
              mainMenu();
            })
            .catch((err) => console.log(err));
        });
    });
  });
}

function updateEmployeeRole() {
  db.viewAllEmployees().then(([employeeData]) => {
    const employeeChoice = employeeData.map(
      ({ Employee_ID, First_Name, Last_Name }) => ({
        value: Employee_ID,
        name: First_Name + " " + Last_Name,
      })
    );
    db.viewAllRoles().then(([roleData]) => {
      const roleChoice = roleData.map(({ Role_ID, Role }) => ({
        value: Role_ID,
        name: Role,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee is being updated?",
            name: "Employee_ID",
            choices: employeeChoice,
          },
          {
            type: "list",
            message: "Which role are they being assigned?",
            name: "Role_ID",
            choices: roleChoice,
          },
        ])
        .then((response) => {
          console.log("response",response);
          db.updateEmployeeRole(response.Employee_ID, response.Role_ID)
            .then(() => {
              const updatedEmployee = employeeData.find(
                (employee) => employee.Employee_ID === response.Employee_ID
              );
              const updatedRole = roleData.find(
                (role) => role.Role_ID === response.Role_ID
              );

              console.log(
                `${updatedEmployee.First_Name} ${updatedEmployee.Last_Name}'s role was updated to: ${updatedRole.Role}`
              );
              mainMenu();
            })
            .catch((err) => console.log(err));
        });
    });
  });
}

