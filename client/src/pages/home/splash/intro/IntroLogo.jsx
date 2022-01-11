import ReadRateReview from "./ReadRateReview";

import classes from "./IntroSplash.module.css";
import logo from "../../../../assets/Logo.png";
import downArrow from "../../../../assets/downArrow.png";
import signUp from "../../../../assets/signUp.png";

export default function IntroLogo({ onLearnMoreClick }) {
   return (
      <div className={classes.logoWrapper}>
         <img className={classes.logo} src={logo} alt="" />
         <ReadRateReview />
         <div className={classes.buttons}>
            <button
               className={classes.button}
               id={classes.learnMore}
               onClick={() => onLearnMoreClick()}
            >
               <img src={downArrow} alt="" />
               Learn More
            </button>
            <button className={classes.button} id={classes.signUp}>
               <img src={signUp} alt="" />
               Sign Up
            </button>
         </div>
      </div>
   );
}
