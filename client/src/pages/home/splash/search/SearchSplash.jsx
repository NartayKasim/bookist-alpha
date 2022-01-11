import classes from "./SearchSplash.module.css";
import searchBg from "../../../../assets/searchBg.png";
import SearchAnimation from "./SearchAnimation";

export default function SearchSplash({ onDownClick }) {
   return (
      <section className={classes.splashWrapperRight} id="searchSplash">
         <img className={classes.searchBg} src={searchBg} alt="searchBg" />
         <div className={classes.searchSplashHeader}>
            <span className={classes.color}>Search</span> <span>for</span>{" "}
            <span className={classes.color}>books</span>{" "}
            <span className="tester">you would like to read.</span>
            <button
               className={classes.learnMoreButton}
               onClick={() => onDownClick("review")}
            >
               Learn More
            </button>
         </div>
         <SearchAnimation />
      </section>
   );
}
