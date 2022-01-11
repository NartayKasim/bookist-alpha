require("dotenv").config({ path: "./.env" });
const axios = require("axios");
const GOOGLE_BOOKS_KEY = process.env.GOOGLE_BOOKS_KEY;

const formatBook = async (req, book) => {
   const {
      id,
      authors,
      averageRating,
      categories,
      description,
      imageLinks,
      industryIdentifiers,
      language,
      maturityRating,
      pageCount,
      publishedDate,
      publisher,
      title,
   } = book;

   let formattedBook;
   const db = req.app.get("db");
   const findLocal = await db.search.get_bookcard([title, authors[0]]);
   if (findLocal.length === 1) {
      formattedBook = findLocal[0];
      formattedBook.average_rating =
         Math.round(formattedBook.average_rating * 100) / 100;
   } else {
      formattedBook = {
         title: title || null,
         author: authors ? authors[0] || null : null,
         book_id: null,
         volume_info: {
            id: id,
            authors: authors || null,
            averageRating: averageRating || null,
            categories: categories || null,
            description: description || null,
            imageLinks: imageLinks || null,
            industryIdentifiers: industryIdentifiers || null,
            language: language || null,
            maturityRating: maturityRating || null,
            pageCount: pageCount || null,
            publishedDate: publishedDate || null,
            publisher: publisher || null,
            title: title || null,
         },
         average_rating: null,
         rating_count: null,
      };
   }
   return formattedBook;
};

module.exports = {
   search: async (req, res) => {
      const { query } = req.params;
      const response = await axios.get(
         `https://www.googleapis.com/books/v1/volumes?q=${query}&filter=partial&key=${GOOGLE_BOOKS_KEY}&maxResults=40`
      );
      let formattedBooksWithoutUserInfo = [];
      await Promise.all(
         response.data.items.map(async (book) => {
            if (book.volumeInfo.title && book.volumeInfo.authors) {
               const result = await formatBook(req, book.volumeInfo);
               formattedBooksWithoutUserInfo.push(result);
            }
         })
      );
      res.status(200).send(formattedBooksWithoutUserInfo);
   },
};
