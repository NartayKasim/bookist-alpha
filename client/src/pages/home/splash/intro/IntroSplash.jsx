import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import classes from "./IntroSplash.module.css";
import footerBooks from "../../../../assets/FooterBooks.svg";
import BookLovers from "./BookLovers";
import IntroLogo from "./IntroLogo";

const resolveLogoVariant = {
   hidden: { opacity: 0, display: "none" },
   shown: {
      display: "block",
      opacity: 1,
      transition: { duration: 1, delay: 1 },
   },
};

const resolveSplashVariant = {
   hidden: { opacity: 0 },
   shown: { opacity: 1, transition: { duration: 1.5 } },
   removed: { opacity: 0, transition: { duration: 1 } },
};

const resolveFooterVariant = {
   hidden: { opacity: 0, display: "none" },
   shown: {
      display: "flex",
      opacity: 1,
      transition: { duration: 1, delay: 1 },
   },
};

export default function IntroSplash({ onLearnMoreClick }) {
   const [resolveLogo, setResolveLogo] = useState(false);

   useEffect(() => {
      !resolveLogo &&
         setTimeout(() => {
            setResolveLogo(true);
         }, 2500);
   }, [resolveLogo]);

   return (
      <div className={classes.introWrapper}>
         <AnimatePresence exitBeforeEnter>
            {!resolveLogo && (
               <motion.div
                  variants={resolveSplashVariant}
                  initial="hidden"
                  animate="shown"
                  exit="removed"
                  className={classes.aggregator}
               >
                  <BookLovers />
               </motion.div>
            )}
         </AnimatePresence>
         {resolveLogo && (
            <motion.div
               variants={resolveLogoVariant}
               initial="hidden"
               animate="shown"
            >
               <IntroLogo onLearnMoreClick={onLearnMoreClick} />
            </motion.div>
         )}

         {resolveLogo && (
            <motion.div
               variants={resolveFooterVariant}
               initial="hidden"
               animate="shown"
               className={classes.footerBooksWrapper}
            >
               <img src={footerBooks} alt="" className={classes.footerBooks} />
            </motion.div>
         )}
      </div>
   );
}
