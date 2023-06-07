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
}

module.exports = new Queries(db)