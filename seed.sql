INSERT INTO Companies (name, address)
VALUES ('Example Company', '123 Example St');

INSERT INTO Users (company_id, first_name, last_name, email, password_hash)
VALUES (1, 'John', 'Doe', 'john.doe@example.com', 'hashedpassword123'),
       (1, 'Jane', 'Smith', 'jane.smith@example.com', 'hashedpassword456');
