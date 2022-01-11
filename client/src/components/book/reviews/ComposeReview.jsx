import classes from "./Reviews.module.css";

export default function ComposeReview({
   content,
   onReviewContentChange,
   onSubmitReviewClick,
}) {
   return (
      <div className={classes.composeReview}>
         <div className={classes.composeReviewTextArea}>
            <textarea
               value={content}
               onChange={(e) => onReviewContentChange(e.target.value)}
               placeholder={"Compose here..."}
               name="review-textarea"
               id=""
               cols="30"
               rows="10"
            ></textarea>
         </div>
         <div className={classes.composeReviewButtons}>
            <button
               className={classes.reviewButton}
               onClick={() => onReviewContentChange()}
            >
               Cancel
            </button>
            <button
               onClick={() => onSubmitReviewClick()}
               className={classes.reviewButton}
            >
               Submit
            </button>
         </div>
      </div>
   );
}
