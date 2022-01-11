import { useSelector } from "react-redux";

export const useFormatWithUserBooks = (book) => {
   const userBooks = useSelector((state) => state.library.userBooks);
   if (userBooks && userBooks.length > 0) {
      for (let i = 0; i < userBooks.length; i++) {
         if (
            book.title === userBooks[i].title &&
            book.author === userBooks[i].author
         ) {
            book.booklists = userBooks[i].booklists;
            book.user_rating = userBooks[i].user_rating;
            book.user_review = userBooks[i].user_review || null;
            book.reviews = userBooks[i].reviews || [];
            return book;
         }
      }
   }
   return book;
};

export const useFormatWithBooklists = (booksArray) => {
   const booklistNames = [];
   booksArray.forEach((book) => {
      if (book.booklists) {
         book.booklists.forEach((name) => {
            if (!booklistNames.includes(name) && name !== "reviewed") {
               booklistNames.push(name);
            }
         });
      }
   });
   const booklistObjArray = booklistNames.map((booklistName) => {
      return {
         booklist_name: booklistName,
         books: booksArray.filter((book) =>
            book.booklists.includes(booklistName)
         ),
      };
   });
   return booklistObjArray;
};
