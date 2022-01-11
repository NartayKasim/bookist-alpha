import classes from "./IntroSplash.module.css";
import books from "../../../../assets/Books.svg";

export default function IntroBackground() {
   return (
      <div className={classes.introBg}>
         <img src={books} alt="" className={classes.books} />
      </div>
   );
}
