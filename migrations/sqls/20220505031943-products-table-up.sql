CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price integer NOT NULL,
  category VARCHAR(100) NOT NULL
);
