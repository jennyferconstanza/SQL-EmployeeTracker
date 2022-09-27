INSERT INTO department(department_name) 
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role(title, salary, department_id)
VALUES 
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4)


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