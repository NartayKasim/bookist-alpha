import classes from "./Cover.module.css";
import noThumbnail from "../../../assets/no-cover.png";

export default function Cover({ imageLinks, size }) {
   const thumbnail = imageLinks
      ? imageLinks.thumbnail || imageLinks.smallThumbnail || noThumbnail
      : noThumbnail;
   return (
      <>
         {size === "large" && (
            <div className={classes.cover}>
               <img
                  className={classes.coverImage}
                  width="110"
                  height="165"
                  src={thumbnail}
                  alt="cover"
               />
            </div>
         )}

         {size === "small" && (
            <div className={classes.cover}>
               <img
                  className={classes.coverImage}
                  width="90"
                  height="137"
                  src={thumbnail}
                  alt="cover"
               />
            </div>
         )}

         {size === "splash" && (
            <img className={classes.coverSplash} src={thumbnail} alt="" />
         )}
      </>
   );
}
