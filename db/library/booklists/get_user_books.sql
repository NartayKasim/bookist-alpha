SELECT library.*, ARRAY_AGG(booklist_title) as booklists, bookcards.average_rating, bookcards.rating_count, ratings.rating as user_rating
FROM library
JOIN library_booklists
ON library_booklists.book_id = library.book_id
JOIN booklists
ON booklists.booklist_id = library_booklists.booklist_id
JOIN bookcards
ON bookcards.book_id = library.book_id
LEFT JOIN ratings
ON booklists.user_id = ratings.user_id AND ratings.book_id = bookcards.book_id
WHERE booklists.user_id = $1
GROUP BY library.book_id, bookcards.average_rating, bookcards.rating_count, ratings.rating;