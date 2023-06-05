const db = require('./connection')

class Queries {
    constructor(db){
        this.connection = db
    }

    viewAllDepartments(){
        return this.connection.promise().query("SELECT * FROM department")
    }
}

module.exports = new Queries(db)