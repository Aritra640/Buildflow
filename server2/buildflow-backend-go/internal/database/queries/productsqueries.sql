-- name: CreateProduct :one
INSERT INTO products (name, description, owner_id, status)
VALUES ($1, $2, $3, $4)
RETURNING *;



-- name: GetProductByID :one
SELECT * FROM products
WHERE id = $1;

-- name: GetProductsByOwner :many
SELECT * FROM products
WHERE owner_id = $1
ORDER BY created_at DESC;


-- name: DeleteProductByID :exec
DELETE FROM products
WHERE id = $1;

