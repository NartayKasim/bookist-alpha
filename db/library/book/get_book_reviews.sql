SELECT reviews.*, users.display_name, ratings.rating FROM reviews
JOIN users
ON users.user_id = reviews.user_id
LEFT JOIN ratings
ON ratings.book_id = reviews.book_id AND reviews.user_id = ratings.user_id
WHERE reviews.book_id = $1