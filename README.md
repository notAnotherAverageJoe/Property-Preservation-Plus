# Property Preservation Plus

### Table of Contents

2. Project Overview
3. Features
4. Tech Stack
5. Installation
6. Environment Variables
7. Running the Application
8. API Endpoints
9. Weather API Integration
10. Testing

Project Overview
Property Preservation Plus is a full-featured property management application. It allows users to manage properties, tenants, maintenance requests, leases, and financial records. The system also includes role-based access control and integrates weather data from the OpenWeather API.

### Live at:

https://property-preservation-plus.onrender.com/

## Features

User authentication and role management
Property and tenant management
Lease tracking and maintenance requests
Financial transactions management
Weather information for property locations
Admin panel for role and user management
Tech Stack
Frontend:

React
Backend:

Node.js
Express.js
PostgreSQL
Third-party API:

## OpenWeather API for weather information

Installation
Clone the Repository

```bash
Copy code
git clone https://github.com/notAnotherAverageJoe/property-preservation-plus.git
cd property-preservation-plus
Install Backend Dependencies
bash
Copy code
npm install
Install Frontend Dependencies (Client Folder)
bash
Copy code
cd client
npm install
```

## Database Setup

### Ensure you have PostgreSQL installed and running. Create your database

psql -U your_username -d your_database
--\i /path/to/your/schema.sql
Run this schema inside the newly created database!

```SQL
-- First, create the Companies table, as it is referenced by other tables.
CREATE TABLE Companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Next, create the Users table, which references the Companies table.
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
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company_id INT,
    user_id INT,
    access_level INT
);

-- Then create the UserRoles table, which references Users and Roles.
CREATE TABLE UserRoles (
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    role_id INT REFERENCES Roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Create the Properties table, which references Companies.
CREATE TABLE Properties (
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES Companies(id),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Units table, which references Properties.
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
```

Environment Variables
In the root directory, create a .env file and add the following environment variables:

### Backend (.env file)

```javascript
PORT = 3000;
DB_HOST = your_database_host;
DB_USER = your_database_user;
DB_PASS = your_database_password;
DB_NAME = your_database_name;
API_KEY = your_openweather_api_key;
JWT_SECRET = your_jwt_secret;
```

### Frontend (.env file)

```javascript
PORT = 3001;
```

For the weather functionality, you will need to sign up for an OpenWeather API key.

Running the Application
Backend
Run the following command to start the server:

```bash
Start server
node server.js

Frontend
Navigate to the client folder and run:
npm start
The backend will run on http://localhost:3000, and the frontend on http://localhost:3001.
```

```Javascript
API A Few of the Endpoints
Authentication
POST /api/auth/register – Register a new user
POST /api/auth/login – Login an existing user
POST /api/auth/creator-login – Creator login
User Management
GET /api/users – Get all users
POST /api/users – Create a new user
PUT /api/users/:id – Update a user
DELETE /api/users/:id – Delete a user
Properties and Tenants
GET /api/properties – Get all properties
POST /api/properties – Create a new property
GET /api/tenants – Get all tenants
```

### Weather API Integration

Fetching Weather Data
To fetch weather data, the application uses the OpenWeather API. This feature is exposed via the /api/weather route. You can get the weather information by providing the city and optionally the state in the query string.

Example:

```bash
Copy code
GET /api/weather?city=San Francisco&state=CA
Example Response
json
Copy code
{
"coord": { "lon": -122.4194, "lat": 37.7749 },
"weather": [
{
"description": "clear sky",
"icon": "01d"
}
],
"main": {
"temp": 68.32,
"feels_like": 67.28,
"temp_min": 64.99,
"temp_max": 72.0
},
"name": "San Francisco"

```

## Testing

To run tests, set up a testing framework like Jest or Mocha. Once tests are written, run:

### Backend Testing

Go to the root of the backend and run the backend tests with

```bash
npm test backend/__tests__/
this will run all the tests on the backend side of the project
```

### Frontend Testing

Go to the client folder in the project, this is where the React Tests are.
Now you can
Run

```bash
Jest
```

this will run all the frontend React tests.
These methods should run over 120 tests inside of the program.

Contributing
Contributions are welcome! To contribute:
ATGTG
Springboard

License
This project is licensed under the MIT License.
