import classes from "./Authors.module.css";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const Authors = React.memo(({ authors, large }) => {
   let authorString = "";
   if (authors !== null) {
      authors.map((author, idx) => {
         if (idx !== authors.length - 1) {
            authorString += author;
            authorString += ",";
            return (authorString += " ");
         } else {
            return (authorString += ` ${author}`);
         }
      });
   }

   return (
      <div className={classes.authors}>
         {authors !== null && !large && (
            <span className={classes.author} key={uuidv4()}>
               by {authorString}
            </span>
         )}
         {authors !== null && large && (
            <span className={classes.authorLarge} key={uuidv4()}>
               by {authorString}
            </span>
         )}
      </div>
   );
});
export default Authors;
