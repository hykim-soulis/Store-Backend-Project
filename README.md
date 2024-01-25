# Storefront Backend Project

The goal of this project is to create a SQL database and tables for the store application and create RESTful APIs that can be accessed by frontend developers using typescript. You can find the data shape of the database, tables and endpoints from the **API Details** section below.<br>
This is a project for Udacity Full Stack JavaScript Developer Nanodegree Program.

## Installation and Startup

1. Clone the project

```bash
  git clone https://github.com/hykim-soulis/Store-Backend-Project.git
```

3. Install the project with npm

```bash
  npm install
```

3. Create a config.env file at the root and copy and paste the information from below in the config.env section

4. Create "store_backend_dev" and "store_backend_test" database via sql query

```
CREATE DATABASE store_backend_dev;
CREATE DATABASE store_backend_test;
```

5. Create "project_user" with password "project456" and grant all privileges to both databases via sql query

```
CREATE USER project_user WITH PASSWORD 'project456';
GRANT ALL PRIVILEGES ON DATABASE store_backend_dev TO project_user;
GRANT ALL PRIVILEGES ON DATABASE store_backend_test TO project_user;
```

6. Connect with "store_backend_dev" database and create tables using below commands

```
  \c store_backend_dev
  db-migrate up
```

7. Test the project with jasmine

```bash
  npm run test
```

## Required Technologies

My application use the following libraries and technologies:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## config.env

My config.env file is not in this repository but I provided the dotenv content below for anyone reviewing this project.

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_backend_dev
POSTGRES_TEST_DB=store_backend_test
POSTGRES_USER=project_user
POSTGRES_PASSWORD=project456
ENV=dev
PORT=8000
BCRYPT_PASSWORD=my-secret-password-protector-private-key
SALT_ROUNDS=10
JWT_SECRET=my-secret-password-protector-private-key
JWT_EXPIRES_IN=90d
```

## API Details

Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.

### API Endpoints

- To test end points, use sample JSON bodies.
- Update <product_id> and <order_id> to real number product_id and order_id
- To test token required endpoints, login first.

#### Users

| Method | API Endpoint | Model       | Parameter or Query           | Sample JSON body                                                                                 |
| ------ | ------------ | ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------ |
| GET    | /user        | getAllUsers | JWT token                    | none                                                                                             |
| GET    | /user/:id    | getUser     | JWT token, id-number(params) | none                                                                                             |
| DELETE | /user        | deleteMe    | JWT token                    | none                                                                                             |
| POST   | /user/signup | signup      | none                         | { "first_name": "John", "last_name": "Smith", "email": "test@test.com", "password": "test1234" } |
| POST   | /user/login  | login       | none                         | {"email": "test@test.com", "password": "test1234" }                                              |

#### Products

| Method | API Endpoint              | Model          | Parameter or Query           | Sample JSON body                                      |
| ------ | ------------------------- | -------------- | ---------------------------- | ----------------------------------------------------- |
| GET    | /product                  | getAllProducts |                              | none                                                  |
| GET    | /product?category=kitchen | getAllProducts | category-string(query)       | none                                                  |
| GET    | /product/:id              | getProduct     | id-number(params)            | none                                                  |
| POST   | /product                  | createProduct  | JWT token                    | { "name": "cup", "price": 15, "category": "kitchen" } |
| DELETE | /product/:id              | deleteProduct  | JWT token, id-number(params) | none                                                  |
| PUT    | /product/:id              | updateProduct  | JWT token, id-number(params) | { "name": "cup", "price": 30, "category": "kitchen" } |
| GET    | /top-5-popular            | getTop5Popular | none                         | none                                                  |

#### Orders

| Method | API Endpoint                          | Model                       | Parameter or Query             | Sample JSON body                                                                                                                                                                                                            |
| ------ | ------------------------------------- | --------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /order                                | getAllOrders                | JWT token                      | none                                                                                                                                                                                                                        |
| GET    | /order?status=active                  | getOrderByStatus            | JWT token,status-string(query) | none                                                                                                                                                                                                                        |
| GET    | /order/:order_id                      | getOrder                    | JWT token, id-number(params)   | none                                                                                                                                                                                                                        |
| POST   | /order                                | createOrder                 | JWT token                      | { "status": "active" }                                                                                                                                                                                                      |
| PUT    | /order/:order_id                      | updateOrder                 | JWT token, id-number(params)   | { "status": "completed" }                                                                                                                                                                                                   |
| DELETE | /order/:order_id                      | deleteOrder                 | JWT token, id-number(params)   | none                                                                                                                                                                                                                        |
| GET    | /order/:order_id/products             | getAllOrderProducts         | JWT token, id-number(params)   |                                                                                                                                                                                                                             |
| POST   | /order/:order_id/products             | addProducts                 | JWT token, id-number(params)   | { "quantity": 5, "product_id": <product_id>, "order_id": <order_id> }                                                                                                                                                       |
| GET    | /order/:order_id/products/:product_id | getOrderProductsByProductId | JWT token, id-number(params)   |                                                                                                                                                                                                                             |
| PUT    | /order/:order_id/products/:product_id | updateOrderProduct          | JWT token, id-number(params)   |                                                                                                                                                                                                                             |
| DELETE | /order/:order_id/products/:product_id | deleteOrderProduct          | JWT token, id-number(params)   |                                                                                                                                                                                                                             |
| POST   | /order/:id/checkout-session           | getCheckoutSession          | JWT token, id-number(params)   | {"product_id": <product_id>, "order_products_id": <order_products_id>, "quantity": 5, "order_id": <order_id>, "name": <name>, "price": <price>, "category": <category>, "img_url": <img_url>, "description": <description>} |

### Data Schema

#### products

| Column      | Type                   | Collation | Nullable | Default                                      |
| ----------- | ---------------------- | --------- | -------- | -------------------------------------------- |
| product_id  | integer                |           | not null | nextval('products_product_id_seq'::regclass) |
| name        | character varying(100) |           | not null |                                              |
| price       | numeric(10,2)          |           | not null |                                              |
| category    | character varying(100) |           | not null |                                              |
| img_url     | character varying      |           | not null |                                              |
| description | character varying      |           | not null |                                              |

Indexes:
"products_pkey" PRIMARY KEY, btree (product_id)
Referenced by:
TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(product_id)

#### users

| Column          | Type                   | Collation | Nullable | Default                                |
| --------------- | ---------------------- | --------- | -------- | -------------------------------------- |
| user_id         | integer                |           | not null | nextval('users_user_id_seq'::regclass) |
| first_name      | character varying(50)  |           | not null |                                        |
| last_name       | character varying(16)  |           | not null |                                        |
| email           | character varying(100) |           | not null |                                        |
| password_digest | character varying      |           | not null |                                        |

Indexes:
"users_pkey" PRIMARY KEY, btree (user_id)
"users_email_key" UNIQUE CONSTRAINT, btree (email)
Referenced by:
TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id)

#### orders

| Column   | Type                  | Collation | Nullable | Default                                  |
| -------- | --------------------- | --------- | -------- | ---------------------------------------- |
| order_id | integer               |           | not null | nextval('orders_order_id_seq'::regclass) |
| status   | character varying(15) |           | not null |                                          |
| user_id  | integer               |           | not null |                                          |

Indexes:
"orders_pkey" PRIMARY KEY, btree (order_id)
Foreign-key constraints:
"orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id)
Referenced by:
TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(order_id)

#### order_products

| Column            | Type    | Collation | Nullable | Default                                                   |
| ----------------- | ------- | --------- | -------- | --------------------------------------------------------- |
| order_products_id | integer |           | not null | nextval('order_products_order_products_id_seq'::regclass) |
| quantity          | integer |           | not null |                                                           |
| product_id        | integer |           | not null |                                                           |
| order_id          | integer |           | not null |                                                           |

Indexes:
"order_products_pkey" PRIMARY KEY, btree (order_products_id)
Foreign-key constraints:
"order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(order_id)
"order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(product_id)
