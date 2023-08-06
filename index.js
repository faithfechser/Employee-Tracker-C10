// Constant dependency variables
const inquirer = require('inquirer');
const mysql = require('mysql2');

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ETC10-db',
});

// Program start function
function programStart() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Select an option:',
        choices: [
          'View all departments',
          'View all professions',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.option) {
        case 'View all departments':
          departmentView();
          break;
        case 'View all roles':
          professionView();
          break;
        case 'View all employees':
          employeeView();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a profession':
          addProfession();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        default:
          connection.end();
          break;
      }
    });
}

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
  programStart();
});

// Department View Function
function departmentView() {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
        programStart();
    });
}

// Profession View Function
function professionView() {
    connection.query('SELECT * FROM profession', (err, results) => {
        if (err) throw err;
        console.table(results);
        programStart();
    });
}

// Employee View Function
function employeeView() {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results);
        programStart();
    });
}

// Add department function
function addDepartment() {
    inquirer
    .prompt([
    {
        type: 'input',
        name: 'department_name',
        message: 'Enter the name of the department:',
    },
    ])
    .then((answer) => {
    connection.query(
        'INSERT INTO department (department_name) VALUES (?)',
        [answer.department_name],
        (err, results) => {
        if (err) throw err;
        console.log('Department added successfully!');
        programStart();
        }
    );
    });
    }
    // Add profession function
    function addProfession() {
    connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    const departments = results.map((department) => department.department_name);

    inquirer
    .prompt([
        {
        type: 'input',
        name: 'title',
        message: 'Enter the name of the role:',
        },
        {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
        },
        {
        type: 'list',
        name: 'department',
        message: 'Select the department for the role:',
        choices: departments,
        },
    ])
    .then((answers) => {
        const departmentName = answers.department;
        connection.query(
        'INSERT INTO profession (title, salary, department_name) VALUES (?, ?, ?)',
        [answers.title, answers.salary, departmentName],
        (err, results) => {
            if (err) throw err;
            console.log ('Profession added successfully!');
            programStart();
        }
        );
    });
    });
}

function addEmployee() {
  connection.query('SELECT * FROM profession', (err, results) => {
    if (err) throw err;
    const profession = results.map((profession) => profession.title);

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "Enter the employee's first name:",
        },
        {
          type: 'input',
          name: 'last_name',
          message: "Enter the employee's last name:",
        },
        {
          type: 'list',
          name: 'profession',
          message: "Select the employee's profession:",
          choices: professions,
        },
        {
          type: 'input',
          name: 'manager',
          message: "Enter the employee's manager's first name (or leave blank if none):",
        },
      ])
      .then((answers) => {
        const professionTitle = answers.profession;
        let manager = null;

        if (answers.manager) {
          const managerName = answers.manager;
          connection.query(
            'SELECT * FROM employee WHERE first_name = ?',
            [managerName],
            (err, results) => {
              if (err) throw err;

              if (results.length > 0) {
                manager = results;
              }

              insertEmployee(answers.first_name, answers.last_name, Title, manager);
            }
          );
        } else {
          insertEmployee(answers.first_name, answers.last_name, Title, manager);
        }
      });
  });
}

// Insert employee function
function insertEmployee(firstName, lastName, professionTitle, manager) {
  connection.query(
    'INSERT INTO employee (first_name, last_name, profession, manager) VALUES (?, ?, (SELECT id FROM profession WHERE title = ?), ?)',
    [firstName, lastName, professionTitle, manager],
    (err, results) => {
      if (err) throw err;
      console.log('Employee added successfully!');
      programStart();
    }
  );
}


function updateEmployeeRole() {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    const employees = results.map((employee) => employee.first_name);

    connection.query('SELECT * FROM profession', (err, results) => {
      if (err) throw err;
      const roles = results.map((role) => role.title);

      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employee',
            message: 'Select the employee to update:',
            choices: employees,
          },
          {
            type: 'list',
            name: 'role',
            message: 'Select the new role for the employee:',
            choices: roles,
          },
        ])
        .then((answers) => {
          connection.query(
            'UPDATE employee SET role_id = (SELECT id FROM profession WHERE title = ?) WHERE first_name = ?',
            [answers.role, answers.employee],
            (err, results) => {
              if (err) throw err;
              console.log('Employee role updated successfully!');
              programStart();
            }
          );
        });
    });
  });
}
  
//   Program Start
programStart();