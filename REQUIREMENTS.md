# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. I built the API that will support this application for its backend.

These are the descriptions that describe what endpoints the API needs to supply, as well as data shapes, schema the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Users

| Method | API Endpoint        | Model                                  | Parameter     |
| ------ | ------------------- | -------------------------------------- | ------------- |
| GET    | /users              | Index [verifyAuthToken]                | none          |                    
| GET    | /user/:id           | Show [verifyAuthToken]                 | id - [number] |
| POST   | /users              | Create                                 | none          | 
| PUT    | /users/:id          | Update [verifyUserId]                  | id - [number] |
| DELETE | /users/:id          | DeleteUser [verifyUserId]              | id - [number] |
| POST   | /user/authenticate  | Authenticate                           | none          |

#### Products

| Method | API Endpoint                   | Model                                         | Parameter           |                                                         
| ------ | ------------------------------ | --------------------------------------------- | ------------------- |
| GET    | /products                      | Index                                         | none                |                                                  
| GET    | /product/:id                   | Show                                          | id - [number]       |                                               
| POST   | /products                      | Create [verifyAuthToken]                      | none                |
| PUT    | /products/:id                  | Update [verifyAuthToken]                      | id - [number]       | 
| DELETE | /products/:id                  | DeleteProduct [verifyAuthToken]               | id - [number]       |                                                       
| GET    | /topFiveProductsBestSelling    | topFiveProductsBestSelling                    | none                |
| GET    | /topfiveProductMostExpensive   | topfiveProductMostExpensive                   | none                | 
| GET    | /productsByCategory/:category  | productsByCategory                            | category - [string] |                                                       

#### Orders

| Method | API Endpoint               | Model                                                                   | Parameter     |                          
| ------ | -------------------------- | ----------------------------------------------------------------------- | ------------- | 
| GET    | /orders                    | Index                                                                   | none          |                                  
| GET    | /order/:id                 | Show                                                                    | id - [number] |                                  
| POST   | /orders                    | Create [verifyAuthToken]                                                | none          |             
| PUT    | /orders/:id                | Update [verifyAuthToken]                                                | id - [number] | 
| DELETE | /orders/:id                | DeleteOrder [verifyAuthToken]                                           | id - [number] |                                
| POST   | /orders/:id/products       | OrderProducts [verifyAuthToken]                                         | id - [number] |                                   

## Data Shapes and Schema

#### products

| Columns  | Types                  |
| -------- | ---------------------- |
| id       | SERIAL PRIMARY KEY     |
| name     | VARCHAR(200) NOT NULL  |
| price    | NUMERIC(10,2) NOT NULL |
| category | VARCHAR(100)           |

#### users

| Columns    | Types                |
| ---------- | -------------------- |
| id         | SERIAL PRIMARY KEY   |
| username   | VARCHAR(100) NOT NULL|
| password   | VARCHAR NOT NULL     |

#### orders

| Columns                    | Types                                         |
| -------------------------- | --------------------------------------------- |
| id                         | SERIAL PRIMARY KEY                            |
| status                     | VARCHAR(50)                                   |
| address                    | VARCHAR(50)                                   |
| user_id                    | bigint REFERENCES users(id) ON DELETE CASCADE |

#### order_products

| Columns    | Types                                             |
| ---------- | ------------------------------------------------- |
| id         | SERIAL PRIMARY KEY                                |
| quantity   | integer                                           |
| order_id   | bigint REFERENCES orders(id) ON DELETE CASCADE    |
| product_id | bigint REFERENCES products(id) ON DELETE RESTRICT |
