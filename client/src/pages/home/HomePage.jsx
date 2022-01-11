import SearchSplash from "./splash/search/SearchSplash";
import ReviewSplash from "./splash/review/ReviewSplash";
import BooklistSplash from "./splash/booklist/BooklistSplash";
import IntroSplash from "./splash/intro/IntroSplash";

import spacerOne from "../../assets/SpacerOne.svg";
import spacerTwo from "../../assets/SpacerTwo.svg";
import spacerThree from "../../assets/SpacerThree.svg";
import classes from "./HomePage.module.css";
import { useRef } from "react";
import { motion } from "framer-motion";

const booksVariant = {
   removed: { opacity: 0 },
   shown: { opacity: 1, transition: { duration: 1, delay: 3.5 } },
};

const HomePage = () => {
   const learnMoreRef = useRef(null);
   const reviewRef = useRef(null);
   const booklistRef = useRef(null);
   const topRef = useRef(null);

   const onLearnMoreClick = () => {
      learnMoreRef.current.scrollIntoView({
         behavior: "smooth",
         block: "center",
      });
   };

   const onDownClick = (sectionStr) => {
      sectionStr === "review" &&
         reviewRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
         });
      sectionStr === "booklist" &&
         booklistRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
         });
      sectionStr === "top" &&
         topRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
         });
   };

   return (
      <div className={classes.homePageWrapper} ref={topRef}>
         <IntroSplash onLearnMoreClick={onLearnMoreClick} />
         <motion.div
            variants={booksVariant}
            initial="removed"
            animate="shown"
            className={classes.spacerOneWrapper}
         >
            <img src={spacerOne} className={classes.spacerOne} alt="" />
         </motion.div>
         <div className={classes.homePageRow} ref={learnMoreRef}>
            <SearchSplash onDownClick={onDownClick} />
         </div>
         <motion.div
            variants={booksVariant}
            initial="removed"
            animate="shown"
            className={classes.spacerTwoWrapper}
         >
            <img src={spacerTwo} className={classes.spacerTwo} alt="" />
         </motion.div>
         <div className={classes.homePageRow} ref={reviewRef}>
            <ReviewSplash onDownClick={onDownClick} />
         </div>
         <motion.div
            variants={booksVariant}
            initial="removed"
            animate="shown"
            className={classes.spacerThreeWrapper}
         >
            <img src={spacerThree} className={classes.spacerThree} alt="" />
         </motion.div>
         <div className={classes.homePageRow} ref={booklistRef}>
            <BooklistSplash onDownClick={onDownClick} />
         </div>
      </div>
   );
};

export default HomePage;
