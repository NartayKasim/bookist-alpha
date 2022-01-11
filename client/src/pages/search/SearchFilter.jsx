import classes from "./SearchPage.module.css";

export default function SearchFilter({ searchResults, applyFilter }) {
   const onFilterResultClick = (filterType) => {
      if (filterType === "popular") {
         let ratingCounts = [];
         let filterByPopular = [];
         for (let i = 0; i < searchResults.length; i++) {
            ratingCounts.push([
               parseInt(searchResults[i].rating_count) || 0,
               i,
            ]);
         }
         let sortedCounts = ratingCounts.sort((a, b) => b[0] - a[0]);
         for (let i = 0; i < sortedCounts.length; i++) {
            filterByPopular.push(searchResults[sortedCounts[i][1]]);
         }
         applyFilter(filterByPopular);
      }
      if (filterType === "rated") {
         let averageRatingCounts = [];
         let filterByHighestRated = [];
         for (let i = 0; i < searchResults.length; i++) {
            averageRatingCounts.push([searchResults[i].average_rating || 0, i]);
         }
         let sortedAverageRatingCounts = averageRatingCounts.sort(
            (a, b) => b[0] - a[0]
         );
         for (let i = 0; i < sortedAverageRatingCounts.length; i++) {
            filterByHighestRated.push(
               searchResults[sortedAverageRatingCounts[i][1]]
            );
         }
         applyFilter(filterByHighestRated);
      }
   };

   return (
      <div className={classes.searchFilter}>
         <div className={classes.searchFilterHeader}>
            <strong>Filters</strong>
         </div>
         <div
            className={classes.searchFilterRow}
            onClick={() => onFilterResultClick("popular")}
         >
            Most Popular
         </div>
         <div
            className={classes.searchFilterRow}
            onClick={() => onFilterResultClick("rated")}
         >
            Highest Rated
         </div>
      </div>
   );
}
