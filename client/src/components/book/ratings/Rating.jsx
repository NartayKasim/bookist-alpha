import classes from "./Rating.module.css";
import RatingPassive from "./RatingPassive";
import RatingActive from "./RatingActive";

export default function Rating({
   isActive,
   average_rating,
   rating_count,
   book,
   setBook,
}) {
   return (
      <div className={classes.rating}>
         {!isActive && (
            <RatingPassive
               average_rating={average_rating}
               rating_count={rating_count}
            />
         )}

         {isActive && <RatingActive book={book} setBook={setBook} />}
      </div>
   );
}
