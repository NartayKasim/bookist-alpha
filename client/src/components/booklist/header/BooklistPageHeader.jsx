import BooklistFooter from "../footer/BooklistFooter";
import classes from "./BooklistPageHeader.module.css";

export default function BooklistPageHeader({
   title,
   editTitle,
   setEditTitle,
   onBooklistRenameClick,
   onBooklistDeleteClick,
   books,
   editBooks,
}) {
   const booklistObj = { booklist_title: title };
   return (
      <div className={classes.booklistPageHeader}>
         <BooklistFooter
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            onBooklistRenameClick={onBooklistRenameClick}
            onBooklistDeleteClick={onBooklistDeleteClick}
            booklistObj={booklistObj}
            books={books}
            editBooks={editBooks}
         />
      </div>
   );
}
