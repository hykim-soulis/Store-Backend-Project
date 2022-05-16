CREATE TABLE order_products (
    order_products_id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    product_id integer REFERENCES products(product_id) NOT NULL,
    order_id integer REFERENCES orders(order_id) NOT NULL
);
