import classes from "./BooklistSplash.module.css";
import booklistBg from "../../../../assets/booklistBg.png";
import BooklistAnimation from "./BooklistAnimation";

export default function BooklistSplash({ onDownClick }) {
   return (
      <div className={classes.splashWrapperRight}>
         <img className={classes.booklistBg} src={booklistBg} alt="searchBg" />
         <div className={classes.booklistSplashHeader}>
            <span className={classes.color}>Create lists</span> <br />
            to organize your favorites and future reads.
            <button
               className={classes.learnMoreButton}
               onClick={() => onDownClick("top")}
            >
               Back To Top
            </button>
         </div>
         <BooklistAnimation />
      </div>
   );
}
