-- Create users table
CREATE TABLE users (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    type VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    active TINYINT DEFAULT 1
);

-- Create stored procedure to add a user
CREATE PROCEDURE addUser (
    IN userEmail VARCHAR(255),
    IN userPassword VARCHAR(255),
    IN userType VARCHAR(255)
)
BEGIN
    INSERT INTO users (email, password, type) 
    VALUES (userEmail, userPassword, userType);
END;

-- Call stored procedure
CALL addUser('test@example.com', 'password123', 'admin');

-- Show results
SELECT * FROM users;
