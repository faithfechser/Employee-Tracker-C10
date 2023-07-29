DROP DATABASE IF EXISTS ETC10-db;
CREATE database ETC10-db;

USE ETC10-db;

-- Department table
CREATE TABLE department (
  department_name VARCHAR(30) NOT NULL
);

-- Profession table
CREATE TABLE profession (
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_name(30) NOT NULL,
  FOREIGN KEY (department_name) REFERENCES department(department_name)
);

-- Employee Table
CREATE TABLE employee (
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title NOT NULL,
  manager NOT NULL,
  FOREIGN KEY (profession) REFERENCES role(profession),
  FOREIGN KEY (manager) REFERENCES employee(first_name)
);
