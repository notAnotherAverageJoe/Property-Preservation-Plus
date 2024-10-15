
--\i /path/to/your/schema.sql


-- First, we create the Companies table, as it is referenced by other tables.
-- One-many- mutiple properties, units ..etc
CREATE TABLE Companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Next, create the Users table, which references the Companies table.
 -- Initially the creator will have no company ID, after they create a company, all users will be made with it.
 -- users can have mutiple roles - many-to-many
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES Companies(id),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Now create the Roles table, which references Users and Companies.
    -- This will handle security level access
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company_id INT,
    user_id INT,
    access_level INT
);

-- Then create the UserRoles table, which references Users and Roles.
-- many-to-many relationship
CREATE TABLE UserRoles (
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    role_id INT REFERENCES Roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Create the Properties table, which references Companies.
-- one-to-many  Properties can have mutiple units
CREATE TABLE Properties (
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES Companies(id),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Units table, which references Properties.
-- One-Many
CREATE TABLE Units (
    id SERIAL PRIMARY KEY,
    property_id INT REFERENCES Properties(id),
    unit_number VARCHAR(255) NOT NULL,
    type VARCHAR(50),  -- e.g., '1B1B', '2B2B'
    rent_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Tenants table 
-- Capable of using Company ID or property-id.
-- For this project I went with Property_id
CREATE TABLE Tenants (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    property_id INT,
    company_id INT 
);


-- Create the Leases table, which references Units, Tenants, and Companies.
-- One-to-many with Units: Each unit can have many leases, but each lease can only belong to one unit.
-- One-to-many with Tenants: Each tenant can have many leases, but each lease can only belong to one tenant. 
-- One-to-many with Companies: Each company can have many leases, but each lease can only belong to one company. 
CREATE TABLE Leases (
    id SERIAL PRIMARY KEY,
    unit_id INT REFERENCES Units(id),
    tenant_id INT REFERENCES Tenants(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    rent_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Active',  -- e.g., 'Active', 'Terminated'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    company_id INT
);
-- CREATE INDEX ON Leases (id) WHERE status = 'Inactive';
-- EXPLAIN ANALYZE SELECT * FROM Leases WHERE status = 'Inactive';



-- Create the MaintenanceRequests table, which references Units.
CREATE TABLE MaintenanceRequests (
    id SERIAL PRIMARY KEY,
    unit_id INT REFERENCES Units(id),
    request_description TEXT NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Pending',  -- e.g., 'Pending', 'Completed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Finally, create the FinancialTransactions table, which references Properties.
CREATE TABLE FinancialTransactions (
    id SERIAL PRIMARY KEY,
    property_id INT REFERENCES Properties(id),
    type VARCHAR(50),  -- e.g., 'Income', 'Expense'
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
