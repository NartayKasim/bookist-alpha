import classes from "./NavigationSearch.module.css";
import search from "../../../assets/search.png";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function NavigationSearch() {
   const [searchInput, setSearchInput] = useState("");
   const navigate = useNavigate();

   const onSearchClick = () => {
      if (searchInput.length > 0) {
         navigate(`/search?=${searchInput}`);
      }
   };

   return (
      <div className={classes.navigationSearch}>
         <input
            onChange={(e) => setSearchInput(e.target.value)}
            className={classes.searchInput}
            placeholder="Search book titles or authors..."
            type="text"
         />
         <button
            className={classes.searchButton}
            onClick={() => onSearchClick()}
         >
            <img className={classes.searchIcon} src={search} alt="" />
         </button>
      </div>
   );
}
