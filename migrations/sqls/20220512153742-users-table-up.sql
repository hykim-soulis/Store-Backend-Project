CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(16) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);
