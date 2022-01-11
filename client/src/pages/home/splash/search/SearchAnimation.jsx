import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import classes from "./SearchSplash.module.css";
import search from "../../../../assets/searchSplash.png";

const splashVariantRight = {
   hidden: {
      width: 0,
      overflow: "hidden",
   },
   shown: {
      width: "25rem",
      opacity: 1,
      transition: { delay: 0.8, duration: 0.35 },
   },
};

export default function SearchAnimation() {
   const controls = useAnimation();
   const { ref, inView } = useInView();

   useEffect(() => {
      if (inView) {
         controls.start("shown");
      }
      if (!inView) {
         controls.start("hidden");
      }
   }, [controls, inView]);

   return (
      <motion.div
         variants={splashVariantRight}
         initial="hidden"
         animate={controls}
         ref={ref}
         className={classes.animateSplash}
      >
         <img className={classes.splash} src={search} alt="search" />
      </motion.div>
   );
}
