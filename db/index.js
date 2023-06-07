const db = require('./connection')

class Queries {
    constructor(db){
        this.connection = db
    }

    viewAllDepartments(){
        return this.connection.promise().query("SELECT * FROM department")
    }
    viewAllRoles(){
        return this.connection.promise().query("SELECT * FROM role")
    }
    viewAllEmployees(){
        return this.connection.promise().query("SELECT * FROM employee")
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
}

module.exports = new Queries(db)