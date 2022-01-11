import { Link } from "react-router-dom";
import { withRouter } from "../../../app/hocs";
import { useDispatch, useSelector } from "react-redux";
import { clearBookState } from "../../../services/volumeInfoSlice";
import { clearBooklists } from "../../../services/librarySlice";
import { toggleIsLoggedIn } from "../../../services/librarySlice";
import axios from "axios";
import classes from "./NavigationMenu.module.css";
import home from "../../../assets/home.png";
import library from "../../../assets/library.png";
import settings from "../../../assets/settings.png";
import logout from "../../../assets/logout.png";
import login from "../../../assets/login.png";

const NavigationMenu = (props) => {
   const isLoggedIn = useSelector((state) => state.library.isLoggedIn);
   const dispatch = useDispatch();
   const location = props.location.pathname;

   const onLogoutClick = () => {
      sessionStorage.removeItem("persist:root");
      axios.delete("/api/auth/logout");
      dispatch(toggleIsLoggedIn());
      dispatch(clearBookState());
      dispatch(clearBooklists([]));
   };

   return (
      <div className={classes.navigationMenu}>
         <Link
            className={classes.linksLink}
            to="/"
            style={{ color: location === "/" && "rgb(255, 140, 140)" }}
         >
            <img className={classes.menuIcon} src={home} alt="" />
            Home
         </Link>
         {isLoggedIn && (
            <Link
               className={classes.linksLink}
               to="/library"
               style={{
                  color: location === "/library" && "rgb(255, 140, 140)",
               }}
            >
               <img className={classes.menuIcon} src={library} alt="" />
               Library
            </Link>
         )}
         {isLoggedIn && (
            <Link
               className={classes.linksLink}
               to="/settings"
               style={{
                  color: location === "/settings" && "rgb(255, 140, 140)",
               }}
            >
               <img className={classes.menuIcon} src={settings} alt="" />
               Settings
            </Link>
         )}
         {isLoggedIn && (
            <Link
               className={classes.linksLinkLast}
               to="/"
               onClick={() => onLogoutClick()}
            >
               <img className={classes.menuIcon} src={logout} alt="" />
               Logout
            </Link>
         )}
         {!isLoggedIn && (
            <Link
               className={classes.linksLinkLast}
               to="/login"
               style={{
                  color:
                     location === "/login"
                        ? "rgb(255, 140, 140)"
                        : "hsla(101, 55%, 42%, 1)",
               }}
            >
               <img className={classes.menuIcon} src={login} alt="" />
               Login/Register
            </Link>
         )}
      </div>
   );
};

export default withRouter(NavigationMenu);
