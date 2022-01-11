import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserBooks } from "../../../services/librarySlice";
import classes from "./Rating.module.css";
import starEmpty from "../../../assets/starEmpty.png";
import starFull from "../../../assets/starFull.png";
import axios from "axios";

export default function RatingActive({ book, setBook }) {
   const dispatch = useDispatch();

   const [stars, setStars] = useState(book.user_rating || 0);
   const [starsIntermediate, setStarsIntermediate] = useState(stars);

   const setHover = (num) => {
      setStarsIntermediate(num);
      setStarsIntermediate(num);
   };

   const setHoverExit = () => {
      setStarsIntermediate(stars);
   };

   const onSetStarsClick = async (num) => {
      setStarsIntermediate(num);
      setStars(num);
      onRateBookClick(num);
   };

   const onRateBookClick = (rating) => {
      axios.post("/api/library/rate", { book, rating }).then((response) => {
         dispatch(updateUserBooks(response.data));
         setBook(response.data);
      });
   };

   return (
      <div className={classes.ratingActive}>
         <div className={classes.ratingActiveTitle}>
            <span>Your Rating</span>
         </div>
         <div className={classes.ratingActiveRating}>
            <img
               className={classes.starImage}
               src={starsIntermediate < 1 ? starEmpty : starFull}
               onMouseEnter={() => setHover(1)}
               onMouseLeave={() => setHoverExit()}
               onClick={() => onSetStarsClick(1)}
               alt="star"
            />
            <img
               className={classes.starImage}
               src={starsIntermediate < 2 ? starEmpty : starFull}
               onMouseEnter={() => setHover(2)}
               onMouseLeave={() => setHoverExit()}
               onClick={() => onSetStarsClick(2)}
               alt="star"
            />
            <img
               className={classes.starImage}
               src={starsIntermediate < 3 ? starEmpty : starFull}
               onMouseEnter={() => setHover(3)}
               onMouseLeave={() => setHoverExit()}
               onClick={() => onSetStarsClick(3)}
               alt="star"
            />
            <img
               className={classes.starImage}
               src={starsIntermediate < 4 ? starEmpty : starFull}
               onMouseEnter={() => setHover(4)}
               onMouseLeave={() => setHoverExit()}
               onClick={() => onSetStarsClick(4)}
               alt="star"
            />
            <img
               className={classes.starImage}
               src={starsIntermediate < 5 ? starEmpty : starFull}
               onMouseEnter={() => setHover(5)}
               onMouseLeave={() => setHoverExit()}
               onClick={() => onSetStarsClick(5)}
               alt="star"
            />
         </div>
      </div>
   );
}
