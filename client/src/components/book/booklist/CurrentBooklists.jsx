import classes from "./AddToBooklist.module.css";
import { v4 as uuidv4 } from "uuid";

export default function CurrentBooklists({ booklists }) {
   return (
      <div className={classes.currentBooklists}>
         {booklists.length > 0 && (
            <>
               {booklists.map((booklist) => (
                  <div key={uuidv4()} className={classes.currentBooklist}>
                     {booklist}
                  </div>
               ))}
            </>
         )}
      </div>
   );
}
