import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { withRouter } from "../../app/hocs";
import { v4 as uuidv4 } from "uuid";
import { getUserBooks, updateBooklistName } from "../../services/librarySlice";
import axios from "axios";
import BooklistPageHeader from "../../components/booklist/header/BooklistPageHeader";
import classes from "./BooklistPage.module.css";
import BooklistItem from "../../components/booklist/item/BooklistItem";

const BooklistPage = ({ id, title }) => {
   const [books, setBooks] = useState(null);
   const [editTitle, setEditTitle] = useState(false);

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const userBooks = useSelector((state) => state.library.userBooks);

   const onBooklistRenameClick = async (newBooklistTitle) => {
      if (
         newBooklistTitle !== title &&
         newBooklistTitle.length > 0 &&
         newBooklistTitle !== "Read Books"
      ) {
         await axios.put("/api/library/booklist/rename", {
            booklist_id: id,
            booklistTitle: newBooklistTitle,
         });
         console.log(title, newBooklistTitle);
         dispatch(
            updateBooklistName({
               oldName: title,
               newName: newBooklistTitle,
            })
         );
      }
      setEditTitle(false);
      navigate(`/booklist/?id=${id}&title=${newBooklistTitle}`);
   };

   const onBooklistDeleteClick = async () => {
      await axios.post("/api/library/booklist/delete", {
         booklistTitle: title,
      });
      await dispatch(getUserBooks());
      navigate("/library");
   };

   const onRemoveBookClick = async (book) => {
      await axios
         .post("/api/library/booklist/remove", { book, booklistTitle: title })
         .then(async () => {
            await dispatch(getUserBooks());
            setBooks(null);
         });
   };

   useEffect(() => {
      const updateBooks = async () => {
         await dispatch(getUserBooks());
      };
      if (title) {
         if (books === null) {
            updateBooks();
            setBooks(
               userBooks.filter(
                  (book) => book.booklists && book.booklists.includes(title)
               )
            );
         }
      } else {
         navigate("/");
      }
   }, [navigate, dispatch, title, userBooks, books]);

   return (
      <>
         {books !== null && (
            <div className={classes.booklistPageWrapper}>
               <BooklistPageHeader
                  title={title}
                  editTitle={editTitle}
                  setEditTitle={setEditTitle}
                  onBooklistRenameClick={onBooklistRenameClick}
                  onBooklistDeleteClick={onBooklistDeleteClick}
                  books={books}
                  editBooks={true}
               />
               <div className={classes.booklistPageBody}>
                  {books &&
                     books !== null &&
                     books.map((book) => (
                        <BooklistItem
                           key={uuidv4()}
                           book={book}
                           editable={true}
                           onRemoveBookClick={onRemoveBookClick}
                        />
                     ))}
               </div>
            </div>
         )}
      </>
   );
};

export default withRouter(BooklistPage);
