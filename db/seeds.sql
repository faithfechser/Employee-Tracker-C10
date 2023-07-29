INSERT INTO department (department_name) 
VALUES 
    ('Management'),
    ('Marketing'),
    ('Sales'),
    ('Front End'),
    ('Back End');

INSERT INTO role (title, salary, department_name) 
VALUES
    ('General Manager', 85000, 'Management'),
    ('Assistant Manager', 70000, 'Management'),
    ('Marketer', 55000, 'Marketing'),
    ('Salesman', 55000, 'Sales'),
    ('Front End Associate', 45000, 'Front End'),
    ('Back End Associate', 45000, 'Back End');

INSERT INTO employee (last_name, first_name, department_name, manager) 
VALUES
    ('Gatsby', 'Jay', 'Management', NULL),
    ('Pines', 'Dipper', 'Back End', 'Jay'),
    ('Undertale', 'Sans', 'Marketer', 'Jay'),
    ('Cartman', 'Eric', 'Sales', 'Jay');