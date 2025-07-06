-- name: CreateUser :one 
INSERT INTO users (username, email, password , avatar_url)
VALUES ($1, $2, $3, $4)
RETURNING *;


-- name: GetUserByID :one
SELECT * FROM users
WHERE id = $1;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = $1;

-- name: GetUserByUsername :one
SELECT * FROM users
WHERE username = $1;



-- name: DeleteUserByID :exec
DELETE FROM users
WHERE id = $1;

-- name: DeleteUserByUsername :exec
DELETE FROM users
WHERE username = $1;

-- name: DeleteUserByEmail :exec
DELETE FROM users
WHERE email = $1;


-- name: UpdateUserPasswordByID :exec 
UPDATE users 
  set password = $2 
WHERE id = $1;

-- name: UpdateUserUsernameByID :exec 
UPDATE users 
  set username = $2 
WHERE id = $1;


-- name: UpdateUserPasswordByUsername :exec 
UPDATE users 
  set password = $2 
WHERE username = $1;
