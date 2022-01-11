import StarGenerator from "../ratings/RatingGenerator";
import classes from "./Reviews.module.css";

export default function Review({
   review,
   setTargetReview,
   onDeleteReviewClick,
}) {
   const date = review.date_created.slice(0, 10);

   return (
      <div className={classes.review}>
         <div className={classes.reviewHeader}>
            <div className={classes.reviewAuthor}>
               by <strong>{review.display_name}</strong>
            </div>
            <div className={classes.reviewRating}>
               <StarGenerator rating={review.rating} />
            </div>
         </div>
         <div className={classes.reviewBody}>
            <div className={classes.reviewContent}>{review.content}</div>
         </div>
         <div className={classes.reviewFooter}>
            <div className={classes.reviewDate}>{date}</div>
            {review.isSessionUser && (
               <div className={classes.reviewButtons}>
                  <button
                     className={classes.reviewButton}
                     onClick={() => setTargetReview(review)}
                  >
                     Edit
                  </button>
                  <button
                     className={classes.reviewButton}
                     onClick={() => onDeleteReviewClick(review)}
                  >
                     Delete
                  </button>
               </div>
            )}
         </div>
      </div>
   );
}
