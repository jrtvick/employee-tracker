USE employees_db;

INSERT INTO department (name)
VALUES 
    ("Sales"),
    ("HR"),
    ("Finance"),
    ("Legal"),
    ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Office Manager", 70000.00, 1),
    ("Human Resources Coordinator", 50000, 2),
    ("Project Coordinator", 38000, 5),
    ("Facilities Manager", 44000, 5),
    ("Account Coordinator", 53000, 3),
    ("Data Entry Clerk", 36000, 5),
    ("Customer Service Representative", 47000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Mort", "Stinkman", 1, NULL),
    ("Elizabeth", "Boop", 2, 1),
    ("Allan", "Yankovich", 3, 2),
    ("William", "Gaits", 4, 3),
    ("Steven", "Careers", 5, 4),
    ("Timothy", "Chef", 6, 5),
    ("Red", "Shrub", 7, 6);