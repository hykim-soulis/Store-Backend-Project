# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

To test the endpoints, use the below bodies in the code blocks.
Update <product_id> and <order_id> to integer product_id and order_id corresponding to your creation.

#### Login

To test token required endpoints, login first.

#### Users

- Index [token required] (GET /user, protect, getAllUsers)
- Show [token required] (GET /user/:id, protect, getUser)
- Delete logged in user [token required] (DELETE /user, protect, deleteMe)

- Create (POST /user/signup, signup)

```
  { "first_name": "John", "last_name": "Smith", "email": "test@test.com", "password": "test1234" }
```

- Login (POST /user/login, login)

```
  { "email": "test@test.com", "password": "test1234" }
```

#### Products

- Index (GET /product, getAllProducts)
- Products by category (args: product category) (GET /product?category=kitchen, getAllProducts)
- Show (GET /product/:id, getProduct)

- Create [token required] (POST /product, protect, createProduct)
- Delete [token required] (DELETE /product/:id, protect, deleteProduct)
- Update [token required] (PUT /product/:id, protect, updateProduct)

```
  { "name": "cup", "price": 15, "category": "kitchen" }
  { "name": "fork", "price": 21, "category": "kitchen" }
  { "name": "shampoo", "price": 8, "category": "bathroom" }
  { "name": "toothpaste", "price": 6, "category": "bathroom" }
  { "name": "book", "price": 12, "category": "office" }
  { "name": "note", "price": 4, "category": "office" }
```

#### Orders

- Index [token required] for logged in current user (GET /order, protect, getAllOrders)
- Index [token required] Active Orders by current user (GET /order?status=active, protect, getAllOrders)
- Index [token required] Completed Orders by current user (GET /order?status=completed, protect, getAllOrders)
- Show [token required] for logged in current user (GET /order/:id, protect, getOrder)

- Create order for logged in current user [token required] (POST /order, protect, createOrder)

```
  { "status": "active" }
```

- Update [token required] (PUT /order/:id, protect, updateOrder)

```
  { "status": "completed" }
```

- Delete [token required] (DELETE /order/:id, protect, deleteOrder)

#### Add Products

- Insert products to the existing order for logged in current user [token required] (POST /order/:id/products, protect, addProducts)

```
  { "quantity": 5, "product_id": <product_id>, "order_id": <order_id> }
  { "quantity": 4, "product_id": <product_id>, "order_id": <order_id> }
  { "quantity": 7, "product_id": <product_id>, "order_id": <order_id> }
  { "quantity": 2, "product_id": <product_id>, "order_id": <order_id> }
  { "quantity": 8, "product_id": <product_id>, "order_id": <order_id> }
  { "quantity": 3, "product_id": <product_id>, "order_id": <order_id> }
  { "quantity": 1, "product_id": <product_id>, "order_id": <order_id> }
  { "quantity": 2, "product_id": <product_id>, "order_id": <order_id> }
  { "quantity": 11, "product_id": <product_id>, "order_id": <order_id> }
```

#### Top 5 popular products

- Top 5 most popular products (GET /top-5-popular, getTop5Popular)

## Data Shapes

#### products

- product_id
- name
- price
- category

#### users

- user_id
- first_name
- last_name
- email
- password

#### orders

- order_id
- status of order (active or complete)
- user_id (from users table)

#### order_products

- order_products_id
- quantity of each product in the order
- product_id (from products table)
- order_id (from orders table)
