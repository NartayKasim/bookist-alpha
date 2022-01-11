INSERT INTO users (display_name, email, password)
VALUES ($1, $2, $3)
RETURNING *;