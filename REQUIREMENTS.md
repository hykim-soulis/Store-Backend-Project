# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

- To test end point, use sample JSON bodies.
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

| Method | API Endpoint         | Model        | Parameter or Query)            | Sample JSON body                                                      |
| ------ | -------------------- | ------------ | ------------------------------ | --------------------------------------------------------------------- |
| GET    | /order               | getAllOrders | JWT token                      | none                                                                  |
| GET    | /order?status=active | getAllOrders | JWT token,status-string(query) | none                                                                  |
| GET    | /order/:id           | getOrder     | JWT token, id-number(params)   | none                                                                  |
| POST   | /order               | createOrder  | JWT token                      | { "status": "active" }                                                |
| PUT    | /order/:id           | updateOrder  | JWT token, id-number(params)   | { "status": "completed" }                                             |
| DELETE | /order/:id           | deleteOrder  | JWT token, id-number(params)   | none                                                                  |
| POST   | /order/:id/products  | addProducts  | JWT token, id-number(params)   | { "quantity": 5, "product_id": <product_id>, "order_id": <order_id> } |

## Data Schema

#### products

| Column     | Type                   | Collation | Nullable | Default                                      |
| ---------- | ---------------------- | --------- | -------- | -------------------------------------------- |
| product_id | integer                |           | not null | nextval('products_product_id_seq'::regclass) |
| name       | character varying(100) |           | not null |                                              |
| price      | integer                |           | not null |                                              |
| category   | character varying(100) |           | not null |                                              |

- Indexes:
  "products_pkey" PRIMARY KEY, btree (product_id)
- Referenced by:
  TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(product_id)

#### users

| Column          | Type                   | Collation | Nullable | Default                                |
| --------------- | ---------------------- | --------- | -------- | -------------------------------------- |
| user_id         | integer                |           | not null | nextval('users_user_id_seq'::regclass) |
| first_name      | character varying(50)  |           | not null |                                        |
| last_name       | character varying(16)  |           | not null |                                        |
| email           | character varying(100) |           | not null |                                        |
| password_digest | character varying      |           | not null |                                        |

- Indexes:
  "users_pkey" PRIMARY KEY, btree (user_id)
  "users_email_key" UNIQUE CONSTRAINT, btree (email)
- Referenced by:
  TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id)

#### orders

| Column   | Type                  | Collation | Nullable | Default                                  |
| -------- | --------------------- | --------- | -------- | ---------------------------------------- |
| order_id | integer               |           | not null | nextval('orders_order_id_seq'::regclass) |
| status   | character varying(15) |           | not null |                                          |
| user_id  | integer               |           | not null |                                          |

- Indexes:
  "orders_pkey" PRIMARY KEY, btree (order_id)
- Foreign-key constraints:
  "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id)
- Referenced by:
  TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(order_id)

#### order_products

| Column            | Type    | Collation | Nullable | Default                                                   |
| ----------------- | ------- | --------- | -------- | --------------------------------------------------------- |
| order_products_id | integer |           | not null | nextval('order_products_order_products_id_seq'::regclass) |
| quantity          | integer |           | not null |                                                           |
| product_id        | integer |           | not null |                                                           |
| order_id          | integer |           | not null |                                                           |

- Indexes:
  "order_products_pkey" PRIMARY KEY, btree (order_products_id)
- Foreign-key constraints:
  "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(order_id)
  "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(product_id)
