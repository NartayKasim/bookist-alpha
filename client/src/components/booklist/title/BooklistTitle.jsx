import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "../../common/input/Input";
import classes from "./BooklistTitle.module.css";

export default function BooklistTitle({
   booklist_title,
   editTitle,
   setEditTitle,
   onBooklistRenameClick,
}) {
   const [booklistTitle, setBooklistTitle] = useState(booklist_title);

   return (
      <>
         {booklistTitle && (
            <div className={classes.booklistTitle}>
               {editTitle ? (
                  <div className={classes.editTitle}>
                     <Input
                        type="text"
                        onChangeFunc={setBooklistTitle}
                        value={booklistTitle}
                        label="Rename Booklist"
                        id={uuidv4()}
                        direction={"column"}
                     />
                     <div className={classes.editTitleButtons}>
                        <button
                           className={classes.editTitleButton}
                           onClick={() => setEditTitle(false)}
                        >
                           Cancel
                        </button>
                        <button
                           className={classes.editTitleButton}
                           onClick={() => onBooklistRenameClick(booklistTitle)}
                        >
                           Submit
                        </button>
                     </div>
                  </div>
               ) : (
                  <div className={classes.title}>{booklist_title}</div>
               )}
            </div>
         )}
      </>
   );
}
