CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id bigint REFERENCES orders(id) ON DELETE CASCADE,
    product_id bigint REFERENCES products(id) ON DELETE RESTRICT
);