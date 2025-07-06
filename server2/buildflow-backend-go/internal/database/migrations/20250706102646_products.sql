-- +goose Up
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  owner_id INT REFERENCES users(id) ON DELETE CASCADE,
  status TEXT, -- 'open', 'in_progress', 'completed'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- +goose Down
DROP TABLE IF EXISTS products;
