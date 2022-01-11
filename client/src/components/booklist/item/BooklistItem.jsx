import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updateUserBooks } from "../../../services/librarySlice";
import Cover from "../../book/cover/Cover";
import classes from "./BooklistItem.module.css";

export default function BooklistItem({ book, editable, onRemoveBookClick }) {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const onBookClick = () => {
      dispatch(updateUserBooks(book));
      navigate(
         `/book/?author=${book.author.replaceAll(
            " ",
            "+"
         )}&title=${book.title.replaceAll(" ", "+")}`
      );
   };

   return (
      <div className={classes.booklistItem}>
         <div className={classes.coverWrapper} onClick={() => onBookClick()}>
            <Cover imageLinks={book.volume_info.imageLinks} size="small" />
         </div>
         {editable && (
            <button
               onClick={() => onRemoveBookClick(book)}
               className={classes.removeBookButton}
            >
               X
            </button>
         )}
      </div>
   );
}
