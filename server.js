const { response } = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

// connect to db
const db = mysql.createConnection({
    host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
},
console.log('Successfully connected to employee_db.'));

// connect mysql server and database
db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Successfully connected.');
    }
    promptMenu();
});