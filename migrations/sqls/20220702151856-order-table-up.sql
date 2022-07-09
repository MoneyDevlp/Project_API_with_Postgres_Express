CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50),
    address VARCHAR(150),
    user_id bigint REFERENCES users(id) ON DELETE CASCADE
);