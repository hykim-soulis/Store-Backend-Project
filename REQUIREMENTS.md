# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

To test the endpoints, use the below body.

#### Login

To test token required endpoints, login first.

#### Products

- Index ('/product/', getAllProducts)
- Show ('/product/:id', getProduct)
- Create [token required] ('/product/', protect, createProduct)

```
  { "name": "cup", "price": 15, "category": "kitchen" }
  { "name": "fork", "price": 21, "category": "kitchen" }
  { "name": "shampoo", "price": 8, "category": "bathroom" }
  { "name": "toothpaste", "price": 6, "category": "bathroom" }
  { "name": "book", "price": 12, "category": "office" }
  { "name": "note", "price": 4, "category": "office" }
```

- Delete [token required] ('/product/:id', protect, deleteProduct)
- Update [token required] ('/product/:id', protect, updateProduct)

```
{ "name": "toothpaste", "price": 13, "category": "bathroom" }
```

- Top 5 most popular products ('/top-5-popular', getTop5Popular)
- Products by category (args: product category) ('/product?category=kitchen', getAllProducts)

#### Users

- Index [token required] ('/user/', protect, getAllUsers)
- Show [token required] ('/user/:id', protect, getAllUsers)
- Create ('/user/signup', signup)

```
  { "first_name": "John", "last_name": "Smith", "email": "test@test.com", "password": "test1234" }
```

- Login ('/user/login', login)

```
  { "email": "test@test.com", "password": "test1234" }
```

#### Orders

- Create order for logged in current user [token required] ('/order', protect, createOrder)

```
  { "product_id": <product_id>, "quantity": 5, "status": "active" }
  { "product_id": <product_id>, "quantity": 4, "status": "active" }
  { "product_id": <product_id>, "quantity": 7, "status": "active" }
  { "product_id": <product_id>, "quantity": 2, "status": "active" }
  { "product_id": <product_id>, "quantity": 8, "status": "active" }
  { "product_id": <product_id>, "quantity": 3, "status": "active" }
  { "product_id": <product_id>, "quantity": 1, "status": "completed" }
  { "product_id": <product_id>, "quantity": 2, "status": "completed" }
  { "product_id": <product_id>, "quantity": 11, "status": "completed" }
```

- Index [token required] for logged in current user ('/order', protect, getAllProducts)
- Index [token required] Completed Orders by user ('/order?status=completed', protect, getAllProducts)
- Index [token required] Active Orders by user ('/order?status=active', protect, getAllProducts)

## Data Shapes

#### Product

- product_id
- name
- price
- category

#### User

- user_id
- first_name
- last_name
- email
- password

#### Orders

- order_id
- product_id (from products table)
- quantity of each product in the order
- user_id (from users table)
- status of order (active or complete)
