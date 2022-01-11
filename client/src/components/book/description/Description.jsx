import classes from "./Description.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const expandVariant = {
   hidden: {
      height: "9.5rem",
      overflow: "hidden",
      transition: { duration: 0.5 },
   },
   shown: { height: "auto", transition: { duration: 0.5 } },
   removed: {
      height: "9.5rem",
      overflow: "hidden",
   },
};

const reduceVariant = {
   hidden: {
      height: "auto",
      transition: { duration: 0.5 },
   },
   shown: {
      height: "9.5rem",
      overflow: "hidden",
      transition: { duration: 0.5 },
   },
   removed: {
      height: "9.5rem",
      overflow: "hidden",
   },
};

export default function Description({ description }) {
   const [expandDescription, setExpandDescription] = useState(false);
   const [showExpandButton, setShowExpandButton] = useState(false);

   useEffect(() => {
      if (description && description !== null && description.length > 230) {
         setShowExpandButton(true);
      }
   }, [showExpandButton, description]);

   return (
      <div className={classes.descriptionWrapper}>
         <AnimatePresence initial={false}>
            <motion.div
               variants={expandDescription ? expandVariant : reduceVariant}
               initial="hidden"
               animate="shown"
               exit="removed"
               className={classes.description}
            >
               {description !== null && description.length > 0 && description}
            </motion.div>
         </AnimatePresence>
         <div className={classes.expandDescriptionRow}>
            {showExpandButton && (
               <button
                  className={classes.expandDescriptionButton}
                  onClick={() => setExpandDescription(!expandDescription)}
               >
                  {expandDescription ? (
                     <span>Reduce Description</span>
                  ) : (
                     <span>Expand Description</span>
                  )}
               </button>
            )}
         </div>
      </div>
   );
}
