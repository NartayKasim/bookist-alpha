import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavigationMenu from "./menu/NavigationMenu";
import NavigationSearch from "./search/NavigationSearch";
import classes from "./Navigation.module.css";
import hamburger from "../../assets/hamburger.png";

const mobileExpand = {
   hidden: {
      height: 0,
      overflow: "hidden",
      opacity: 0,
   },
   shown: {
      height: "auto",
      transition: { duration: 0.25 },
      opacity: 1,
   },
   removed: {
      height: 0,
      overflow: "hidden",
      opacity: 0,
      transition: { duration: 0.25 },
   },
};

const mobileContract = {
   hidden: {
      height: "auto",
      opacity: 1,
   },
   shown: {
      height: 0,
      overflow: "hidden",
      opacity: 0,
      transition: { duration: 0.25 },
   },
   removed: {
      height: "auto",
      transition: { duration: 0.25 },
      opacity: 1,
   },
};

const Navigation = () => {
   const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

   return (
      <>
         <div className={classes.navigationWrapper}>
            <div className={classes.navigation}>
               <div className={classes.searchWrapper}>
                  <NavigationSearch />
               </div>
               <div className={classes.menuWrapper}>
                  <NavigationMenu />
               </div>
               <button
                  className={classes.expandMenuButton}
                  onClick={() => setDisplayMobileMenu(!displayMobileMenu)}
               >
                  <img src={hamburger} alt="" className={classes.hamburger} />
               </button>
            </div>
            <AnimatePresence>
               {displayMobileMenu && (
                  <motion.div
                     variants={
                        displayMobileMenu ? mobileExpand : mobileContract
                     }
                     initial="hidden"
                     animate="shown"
                     exit="removed"
                     className={classes.mobileMenuWrapper}
                  >
                     <NavigationMenu />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </>
   );
};

export default Navigation;
