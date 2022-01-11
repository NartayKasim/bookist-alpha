import { useEffect } from "react";
import { useState, useMemo } from "react";
// import { useSelector } from "react-redux";
import axios from "axios";
import classes from "./AddToBooklist.module.css";
import CurrentBooklists from "./CurrentBooklists";
import AvailableBooklists from "./AvailableBooklists";
import CreateNewBooklist from "./CreateNewBooklist";

export default function AddToBooklist({ book, setBook }) {
   const [booklists, setBooklists] = useState(null);
   const [displayAddToBooklist, setDisplayAddToBooklist] = useState(false);

   const booklistsFromState = useMemo(
      () => book.booklists || [],
      [book.booklists]
   );
   const availableBooklists =
      booklists !== null &&
      booklists.filter(
         (booklist) => !booklistsFromState.includes(booklist.booklist_title)
      );

   const createNewBooklist = async (newBooklistName) => {
      const response = await axios.post("/api/library/booklist-create", {
         newBooklistName,
         book,
      });
      const bookObj = response.data;
      setDisplayAddToBooklist(false);
      setBook(bookObj);
   };

   const addToBooklist = async (idx) => {
      const response = await axios.put("/api/library/booklist-add", {
         book,
         booklist_id: availableBooklists[idx].booklist_id,
      });
      const bookObj = response.data;
      setDisplayAddToBooklist(false);
      setBook(bookObj);
   };

   useEffect(() => {
      const getBooklistNames = async () => {
         const response = await axios.get("/api/library/booklist-names");
         const booklistsTotal = response.data;
         setBooklists(booklistsTotal);
      };
      if (booklists === null) {
         getBooklistNames();
      }
   }, [booklistsFromState, booklists]);

   return (
      <div className={classes.addToBooklist}>
         <div className={classes.currentBooklistsWrapper}>
            {booklistsFromState && booklistsFromState.length > 0 && (
               <span>Included In:</span>
            )}
            <CurrentBooklists booklists={booklistsFromState || []} />
         </div>
         <button
            onClick={() => setDisplayAddToBooklist(!displayAddToBooklist)}
            className={classes.addToBooklistButton}
         >
            Add To Booklist
         </button>
         {displayAddToBooklist && (
            <>
               <div className={classes.availableBooklistsWrapper}>
                  {availableBooklists && availableBooklists.length > 0 && (
                     <AvailableBooklists
                        addToBooklist={addToBooklist}
                        availableBooklists={availableBooklists}
                     />
                  )}
                  {availableBooklists && availableBooklists.length === 0 && (
                     <strong>
                        There are no booklists available. Create a new booklist
                        below.
                     </strong>
                  )}
               </div>
               <div className={classes.createNewBooklistWrapper}>
                  {booklists && (
                     <CreateNewBooklist
                        createNewBooklist={createNewBooklist}
                        booklists={booklists}
                        availableBooklists={availableBooklists}
                     />
                  )}
               </div>
            </>
         )}
      </div>
   );
}
