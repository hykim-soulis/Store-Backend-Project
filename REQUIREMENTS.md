# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Login

To test token required endpoints, login first.

#### Products

- Index ('/product/', getAllProducts)
- Show ('/product/:id', getProduct)
- Create [token required] ('/product/', protect, createProduct)
- Delete [token required] ('/product/:id', protect, deleteProduct)
- Update [token required] ('/product/:id', protect, updateProduct)
- Top 5 most popular products ('/top-5-popular', getTop5Popular)
- Products by category (args: product category) ('/product?category=<category>', getAllProducts)

#### Users

- Index [token required] ('/user/', protect, getAllUsers)
- Show [token required] ('/user/:id', protect, getAllUsers)
- Create ('/user/signup', signup)
- Login ('/user/login', login)

#### Orders

- Create order for logged in current user [token required] ('/order', protect, createOrder)
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
