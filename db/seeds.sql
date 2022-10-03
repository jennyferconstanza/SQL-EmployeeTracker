INSERT INTO department(department_name) 
VALUES 
('Engineering'), 
('Finance'),
('Legal'),
('Sales');

INSERT INTO role(title, salary, department_id)
VALUES 
('Sales Associate', 75000, 4),
('Software Engineer', 180000, 1),
('Lawyer', 200000, 3),
('Accountant', 170000, 2),
('Account Manager', 190000, 4),
('Project Manager', 165000, 1);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Jennyfer', 'Constanza', 1, null),
('George', 'Constanza', 2, 1),
('Melva', 'Constanza', 3, 3),
('Karina', 'Cruz', 4, 3),
('Chris', 'Lopez', 5, 2),
('Ben', 'Affleck', 6, 2);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Jennyfer', 'Constanza', 1, NULL),
('George', 'Constanza', 2, 1),
('Melva', 'Constanza', 3, NULL),
('Karina', 'Cruz', 4, 3),
('Chris', 'Lopez', 5, NULL),
('Ben', 'Affleck', 6, 5),
('John', 'Doe', 7, NULL),
('Jane', 'Doe', 8, 7);