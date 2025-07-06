-- +goose Up
CREATE TABLE IF NOT EXISTS components (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  name TEXT NOT NULL,
  specs JSONB, -- technical specifications
  quantity INT NOT NULL,
  assigned_to INT REFERENCES users(id), -- manufacturer/supplier
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- +goose Down
DROP TABLE IF EXISTS components ;

