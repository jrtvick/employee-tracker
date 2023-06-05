const inquirer = require("inquirer");
const db = require("./db");

init();

function init(){
inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: ['View all departments', 'exit'],
    }
  ])
  .then((answers) => {
    console.log('log me');
  })};

function viewAllDepartments() {
  db.viewAllDepartments()
    .then((data) => {
      console.log("hello");
      console.log(data);
    })
    .catch((err) => console.log(err));
}
