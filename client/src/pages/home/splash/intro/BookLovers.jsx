import classes from "./IntroSplash.module.css";

export default function BookLovers() {
   return (
      <div className={classes.aggregator}>
         <div className={classes.aggregatorRow}>
            <span>book</span> <span className={classes.color}>reviews</span>{" "}
            <span>and</span>
            <span className={classes.color}>ratings</span>
         </div>

         <div className={classes.aggregatorRow}>
            <span className={classes.color}>for</span>
            <span>lovers of books</span>
         </div>
         <div className={classes.aggregatorRow}>
            <span className={classes.color}>by</span>{" "}
            <span>lovers of books</span>
         </div>
      </div>
   );
}
