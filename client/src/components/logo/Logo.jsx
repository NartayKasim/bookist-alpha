import classes from "./Logo.module.css";
import logo from "../../assets/Logo.png";
// import { AnimatePresence, motion } from "framer-motion";
import { withRouter } from "../../app/hocs";
// import { useState } from "react";
// import { useEffect } from "react";

// const homePageEnabled = {
//    hidden: {
//       opacity: 0,
//    },
//    shown: { opacity: 1, transition: { duration: 0.25 } },
// };

const Logo = ({ location, enableLogo }) => {
   // const [isEnabled, setIsEnabled] = useState(true);

   // useEffect(() => {
   //    if (location.pathname !== "/" && !isEnabled) {
   //       setIsEnabled(true);
   //    } else if (location.pathname === "/" && enableLogo) {
   //       setIsEnabled(true);
   //    } else if (location.pathname === "/" && !enableLogo) {
   //       setIsEnabled(false);
   //    }
   // }, [location.pathname, enableLogo, isEnabled]);

   return (
      <div className={classes.logoWrapper}>
         {/* <AnimatePresence>
            <motion.div
               variants={enableLogo && homePageEnabled}
               style={{
                  display: isEnabled ? "block" : "none",
               }}
               initial="hidden"
               animate="shown" */}
         {/* > */}
         <img className={classes.logo} src={logo} alt="" />
         {/* </motion.div>
         </AnimatePresence> */}
      </div>
   );
};

export default withRouter(Logo);
