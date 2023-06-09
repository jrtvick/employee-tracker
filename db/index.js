const db = require('./connection')

class Queries {
    constructor(db){
        this.connection = db
    }

    viewAllDepartments(){
        return this.connection.promise().query("SELECT department.id AS Department_ID, department.name AS Department_Name FROM department")
    }
    viewAllRoles(){
        return this.connection.promise().query("SELECT role.id AS Role_ID, role.title AS Role, role.salary AS Salary, department.name AS Department FROM role LEFT JOIN department on role.department_id = department.id")
    }
    viewAllEmployees(){
        return this.connection.promise().query("SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Role, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager, manager.id AS Manager_ID, department.name AS Department FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id")
    }
    addToDepartments(department){
        return this.connection.promise().query("INSERT INTO department SET ?", department)
    }
    addToRoles(role){
        return this.connection.promise().query("INSERT INTO role SET ?", role)
    }
    addToEmployees(employee){
        return this.connection.promise().query("INSERT INTO employee SET ?", employee)
    }
    updateEmployeeRole(employee_id, role_id){
        return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [role_id, employee_id])
    }
}

module.exports = new Queries(db)