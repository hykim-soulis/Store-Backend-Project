CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    product_id integer REFERENCES products(product_id) NOT NULL,
    quantity integer NOT NULL,
    user_id integer REFERENCES users(user_id) NOT NULL,
    status VARCHAR(15) NOT NULL
);
