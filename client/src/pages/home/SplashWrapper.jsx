import { motion, AnimatePresence } from "framer-motion";
import classes from "./HomePage.module.css";

const carouselVariant = {
   hidden: { opacity: 0 },
   shown: { opacity: 1, transition: { duration: 0.35, delay: 0.25 } },
   removed: { opacity: 1, transition: { duration: 1 } },
};

export default function SplashWrapper({ children }) {
   return (
      <AnimatePresence>
         <motion.div
            variants={carouselVariant}
            initial="hidden"
            animate="shown"
            exit="removed"
            className={classes.homePageRow}
         >
            {children}
         </motion.div>
      </AnimatePresence>
   );
}
