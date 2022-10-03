require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");
// connect to db
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Littlemama0713!",
    database: "employee_db",
  },
  console.log("Successfully connected to employee_db.")
);
// connect to mysql server and database
db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Successfully connected.");
  }
  promptMenu();
});

const promptMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoices",
        message: "Please select what you would like to do.",
        choices: [
          "View all departments.",
          "View all roles.",
          "View all employees.",
          "Add a department.",
          "Add a role.",
          "Add an employee.",
          "Update an employee role.",
          "Done.",
        ],
      },
    ])
    .then((options) => {
      switch (options.userChoices) {
        case "View all departments.":
          viewDepartments();
          break;
        case "View all roles.":
          viewRoles();
          break;
        case "View all employees.":
          viewEmployees();
          break;
        case "Add a department.":
          addDepartment();
          break;
        case "Add a role.":
          addRole();
          break;
        case "Add an employee.":
          addEmployee();
          break;
        case "Update an employee role.":
          updateEmployee();
          break;
        default:
          promptMenu();
          break;
      }
    });
};

// displays info
const viewDepartments = (response) => {
  console.log("Departments.");

  db.query("SELECT * FROM department ", function (err, results) {
    console.table(results);
  });
  promptMenu();
};

const viewRoles = () => {
  console.log("Roles.");

  db.query("SELECT * FROM role ", function (err, results) {
    console.table(results);
  });
  promptMenu();
};

const viewEmployees = () => {
  console.log("Employees.");

  db.query("SELECT * FROM employee ", function (err, results) {
    console.table(results);
  });

  promptMenu();
};
// function adds department
const addDepartment = () => {
  console.log("Add a department.");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the name of the department.",
        name: "departmentName",
      },
    ])
    .then((res) => {
      const { departmentName } = res;
      db.promise()
        .query(
          "INSERT INTO department (department_name) VALUES (?)",
          departmentName
        )
        .then(() => console.log(`Added ${departmentName} to db`));
    })
    .then(() => promptMenu());
};
// function adds role
const addRole = () => {
  console.log("Add a role.");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the name of the role.",
        name: "role",
      },
      {
        type: "input",
        message: "Enter the salary of the role.",
        name: "salary",
      },
    ])
    .then((res) => {
      // get role and salary user entered
      const { role, salary } = res;
      // fetch departments from the db to assign  role to a department
      db.promise()
        .query("SELECT * FROM department")
        .then(([rows]) => {
          const allDepartments = rows;
          const departmentChoices = allDepartments.map(
            ({ department_id, department_name }) => ({
              name: department_name,
              value: department_id,
            })
          );
          // prompts user to select dept and create role
          inquirer
            .prompt({
              type: "list",
              name: "departmentId",
              message: "Enter which department the role belongs to.",
              choices: departmentChoices,
            })
            .then((response) => {
              // creates new role with role, salary, and department id
              console.log("response", response);
              db.promise()
                .query(
                  "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
                  [role, salary, response.departmentId]
                )
                .then(() => console.log("Role added successfully."))
                .then(() => promptMenu());
            });
        });
    });
};
// functions adds employee
const addEmployee = () => {
  console.log("Add an employee.");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's first name.",
        name: "firstName",
      },
      {
        type: "input",
        message: "Enter the employee's last name.",
        name: "lastName",
      },
    ])
    .then((res) => {
      // get the first name and the last name user inputted
      const { firstName, lastName } = res;
      let roleId;
      // gets roles
      db.promise()
        .query("SELECT * FROM role")
        .then(([rows]) => {
          // create role options
          const roleChoices = rows.map(({ role_id, title }) => ({
            name: title,
            value: role_id,
          }));
          // asks user for role
          inquirer
            .prompt({
              type: "list",
              name: "roleId",
              message: "Enter the employee's role.",
              choices: roleChoices,
            })
            .then((res) => {
              roleId = res.roleId;
              db.promise()
                .query("SELECT * FROM employee")
                .then(([rows]) => {
                  const allEmployees = rows;
                  // create the choices from  managers
                  const managerChoices = allEmployees
                    .filter((e) => !e.manager_id)
                    .map(({ first_name, last_name, employee_id }) => ({
                      name: `${first_name} ${last_name}`,
                      value: employee_id,
                    }));
                  inquirer
                    .prompt({
                      type: "list",
                      name: "managerId",
                      message: "Enter the employee's manager.",
                      choices: managerChoices,
                    })
                    .then((response) => {
                      const managerId = response.managerId;
                      console.log("ROLE ID: ", roleId);
                      console.log("MANAGER ID: ", managerId);
                      db.promise()
                        .query(
                          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
                          [firstName, lastName, roleId, managerId]
                        )
                        .then(() => console.log("Employee added successfully."))
                        .then(() => promptMenu());
                    });
                });
            });
        });
    });
};
// update values
const updateEmployee = () => {
  console.log("Update an employee.");
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What their first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What their last name?",
      },
      {
        type: "input",
        name: "newRole",
        message: "What their new role?",
      },
    ])
    .then(({ first_name, last_name, newRole }) => {
      const newEmployeeRole =
        "UPDATE employee (first_name, last_name, role_id) WHERE ?";
      db.query(newEmployeeRole, (first_name, last_name, newRole));
    })
    .then(() => promptMenu());
};
