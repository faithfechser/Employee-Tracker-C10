-- department
INSERT INTO department (name) 
VALUES 
    ('Management'),
    ('Marketing'),
    ('Sales'),
    ('Front End'),
    ('Back End');
-- role
INSERT INTO role (title, salary, department_id) 
VALUES
    ('General Manager', 85000, 1),
    ('Assistant Manager', 70000, 1),
    ('Marketer', 55000, 2),
    ('Salesman', 55000, 3),
    ('Front End Associate', 45000, 4),
    ('Back End Associate', 45000, 5);
-- employee
INSERT INTO employee (last_name, first_name,role_id, manager_id) 
VALUES
    ('Gatsby', 'Jay', 1, NULL),
    ('Pines', 'Dipper', 2, 1),
    ('Iplier', 'Mark', 3, 1),
    ('Schlatt', 'Jonathan', 3, 1),
    ('Undertale', 'Sans', 4, 1),
    ('Cartman', 'Eric', 5, 1);