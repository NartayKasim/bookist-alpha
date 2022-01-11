import classes from "./AddToBooklist.module.css";
import { v4 as uuidv4 } from "uuid";

export default function AvailableBooklists({
   addToBooklist,
   availableBooklists,
}) {
   availableBooklists = availableBooklists.filter(
      (booklist) => booklist.booklist_title !== "Read Books"
   );
   return (
      <div className={classes.availableBooklists}>
         <div className={classes.availableBooklistsHeader}>
            Select Booklist:
         </div>
         {availableBooklists &&
            availableBooklists.map((booklist, idx) => (
               <div
                  onClick={() => addToBooklist(idx)}
                  key={uuidv4()}
                  className={classes.availableBooklist}
               >
                  {booklist.booklist_title}
               </div>
            ))}
      </div>
   );
}
