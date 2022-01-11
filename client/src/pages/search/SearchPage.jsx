import classes from "./SearchPage.module.css";
import { withRouter } from "../../app/hocs";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Loading from "../../components/common/loading/Loading";
import Book from "../../components/book/Book";
import SearchFilter from "./SearchFilter";

const SearchPage = (props) => {
   const query = props.location.search.slice(7);
   const [isLoading, setIsLoading] = useState(true);
   const [searchResults, setSearchResults] = useState(null);
   const [filter, setFilter] = useState(false);
   const [errorState, setErrorState] = useState("");

   const applyFilter = (booksArray) => {
      setFilter(true);
      setSearchResults(null);
      setSearchResults(booksArray);
   };

   const applySearch = useCallback(async () => {
      try {
         const response = await axios.get(`/api/search/${query}`);
         setSearchResults(response.data);
      } catch (e) {
         setErrorState(e.response.data);
      }
      setIsLoading(false);
   }, [query]);

   useEffect(() => {
      if (!filter) {
         applySearch();
      }
   }, [filter, applySearch]);

   return (
      <>
         {isLoading && <Loading />}

         {!isLoading && (
            <div className={classes.searchPageWrapper}>
               <div className={classes.searchWrapper}>
                  {errorState.length === 0 ? (
                     <>
                        {searchResults.map((searchResult) => (
                           <Book searchResult={searchResult} key={uuidv4()} />
                        ))}
                     </>
                  ) : (
                     <strong> {errorState} </strong>
                  )}
               </div>
               <div className={classes.searchFilterWrapper}>
                  <SearchFilter
                     searchResults={searchResults}
                     applyFilter={applyFilter}
                  />
               </div>
            </div>
         )}
      </>
   );
};

export default withRouter(SearchPage);
