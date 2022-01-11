import classes from "./Rating.module.css";
import starEmpty from "../../../assets/starEmpty.png";
import starFull from "../../../assets/starFull.png";

export default function StarGenerator({ rating }) {
   return (
      <div className={classes.starGenerator}>
         {rating >= 1 ? (
            <img className={classes.starImage} src={starFull} alt="" />
         ) : (
            <img className={classes.starImage} src={starEmpty} alt="" />
         )}
         {rating >= 2 ? (
            <img className={classes.starImage} src={starFull} alt="" />
         ) : (
            <img className={classes.starImage} src={starEmpty} alt="" />
         )}
         {rating >= 3 ? (
            <img className={classes.starImage} src={starFull} alt="" />
         ) : (
            <img className={classes.starImage} src={starEmpty} alt="" />
         )}
         {rating >= 4 ? (
            <img className={classes.starImage} src={starFull} alt="" />
         ) : (
            <img className={classes.starImage} src={starEmpty} alt="" />
         )}
         {rating === 5 ? (
            <img className={classes.starImage} src={starFull} alt="" />
         ) : (
            <img className={classes.starImage} src={starEmpty} alt="" />
         )}
      </div>
   );
}
