import classes from "./Rating.module.css";
import starEmpty from "../../../assets/starEmpty.png";
import starFull from "../../../assets/starFull.png";

export default function RatingPassive({ average_rating, rating_count }) {
   const convertRating = parseInt(average_rating) || 0;

   return (
      <div className={classes.ratingPassive}>
         <div className={classes.ratingPassiveTitle}>
            <span>
               {rating_count || "No"}{" "}
               {rating_count === "1" ? "Review" : "Reviews"}
            </span>
         </div>
         <div className={classes.ratingPassiveRating}>
            {convertRating >= 1 ? (
               <img className={classes.starImage} src={starFull} alt="" />
            ) : (
               <img className={classes.starImage} src={starEmpty} alt="" />
            )}
            {convertRating >= 2 ? (
               <img className={classes.starImage} src={starFull} alt="" />
            ) : (
               <img className={classes.starImage} src={starEmpty} alt="" />
            )}
            {convertRating >= 3 ? (
               <img className={classes.starImage} src={starFull} alt="" />
            ) : (
               <img className={classes.starImage} src={starEmpty} alt="" />
            )}
            {convertRating >= 4 ? (
               <img className={classes.starImage} src={starFull} alt="" />
            ) : (
               <img className={classes.starImage} src={starEmpty} alt="" />
            )}
            {convertRating === 5 ? (
               <img className={classes.starImage} src={starFull} alt="" />
            ) : (
               <img className={classes.starImage} src={starEmpty} alt="" />
            )}
         </div>
      </div>
   );
}
