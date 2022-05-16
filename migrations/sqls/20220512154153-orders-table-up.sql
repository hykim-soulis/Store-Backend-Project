CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    user_id integer REFERENCES users(user_id) NOT NULL
);
