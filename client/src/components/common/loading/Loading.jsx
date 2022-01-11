import classes from "./Loading.module.css";
import { AnimatePresence, motion } from "framer-motion";

const loadingVariant = {
   hidden: {
      opacity: 0,
   },
   shown: {
      opacity: 1,
      transition: { duration: 0.5 },
   },
   removed: {
      opacity: 0,
      transition: {
         duration: 0.5,
      },
   },
};

export default function Loading() {
   return (
      <div className={classes.loadingWrapper}>
         <AnimatePresence>
            <motion.span
               variants={loadingVariant}
               initial="hidden"
               animate="shown"
               exit="removed"
            >
               Loading
            </motion.span>
         </AnimatePresence>
      </div>
   );
}
