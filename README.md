## Getting Started

- Get project, run `git clone https://github.com/MoneyDevlp/Project_API_with_Postgres_Express.git` in your terminal or git bash. This project is running on port 3000.

Get started:

- Install, create database and start the API server

  In SQL Shell

  - Create user and password using command `CREATE USER shopping_user WITH PASSWORD 'password123';`
  
  - Create 2 databases in your postgres SQL Shell, 1 for development, 1 for testing
      
              Database dev:     CREATE DATABASE shopping;
        
              Database test:    CREATE DATABASE shopping_test;
              
  - Connect database use command in SQL Shell:
  
              Database dev:     `\c shopping GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`
 
              Database test:     `\c shopping_test GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`
  
  - To test that it is working run `\dt` and it should output "No relations found."
  
  - create file .env and config:
  
     - POSTGRES_HOST=localhost
     - POSTGRES_DB=shopping
     - POSTGRES_USER=shopping_user
     - POSTGRES_PASSWORD=password123
     - POSTGRES_DB_TEST=shopping_test
     - ENV=test
     - PEPPER=shopping-store
     - SALT_ROUNDS=10
     - TOKEN_SECRET=secret-token
     - PASSWORD_TEST=test

  In terminal

  - `npm install`
  - For Development Environment
    - Manually change `ENV=dev` in .env file
    - Run `npm run watch` each time when there are changes in codes
  - For Test Environment
    - Run `npm run test` to test
