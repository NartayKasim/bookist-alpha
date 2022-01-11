import classes from "./ReviewSplash.module.css";
import reviewBg from "../../../../assets/reviewBg.png";
import ReviewAnimation from "./ReviewAnimation";

export default function ReviewSplash({ onDownClick }) {
   return (
      <div className={classes.splashWrapperLeft}>
         <img className={classes.reviewBg} src={reviewBg} alt="reviewBg" />
         <ReviewAnimation />
         <div className={classes.reviewSplashHeader}>
            <span>
               <span className={classes.color}>Rate</span>,{" "}
               <span className={classes.color}>review</span> and{" "}
               <span className={classes.color}>discuss</span> your favorites.
            </span>
            <button
               className={classes.learnMoreButton}
               onClick={() => onDownClick("booklist")}
            >
               Learn More
            </button>
         </div>
      </div>
   );
}
