// Constant variables
const inquier = require('inquirer');
const mysql = require('mysql2');

// MySQL connection
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'ETC10-db',
});

// Department View Function
function departmentView() {
    connection.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
      console.table(results);
      startApp();
    });
  }
  
  // Profession View Function
  function professionView() {
    connection.query('SELECT * FROM profession', (err, results) => {
      if (err) throw err;
      console.table(results);
      startApp();
    });
  }
  
  // Employee View Function
  function employeeView() {
    connection.query('SELECT * FROM employee', (err, results) => {
      if (err) throw err;
      console.table(results);
      startApp();
    });
  }