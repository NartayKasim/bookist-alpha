import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import classes from "./ReviewSplash.module.css";
import review from "../../../../assets/reviewSplash.png";

const splashVariantLeft = {
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

export default function ReviewAnimation() {
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
         variants={splashVariantLeft}
         initial="hidden"
         animate={controls}
         ref={ref}
         className={classes.animateSplash}
      >
         <img className={classes.splash} src={review} alt="search" />
      </motion.div>
   );
}
