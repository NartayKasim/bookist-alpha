import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import axios from "axios";
import classes from "./Reviews.module.css";
import Review from "./Review";
import ComposeReview from "./ComposeReview";

export default function Reviews({ book, updateBook }) {
   const isLoggedIn = useSelector((state) => state.library.isLoggedIn);
   const [reviews, setReviews] = useState(null);
   const [targetReview, setTargetReview] = useState({});

   const onReviewContentChange = (val) => {
      if (!val) {
         return setTargetReview({});
      }
      setTargetReview({ ...targetReview, content: val });
   };

   const onSubmitReviewClick = async () => {
      if (
         targetReview.review_id &&
         targetReview.content &&
         targetReview.content.length > 0
      ) {
         axios
            .post("/api/library/review", { book, review: targetReview })
            .then((response) => setReviews(response.data));
      } else {
         if (targetReview.content.length > 0) {
            axios
               .post("/api/library/review", {
                  book,
                  review: { content: targetReview.content },
               })
               .then((response) => {
                  if (response.data.length === 2) {
                     setReviews(response.data[0]);
                     updateBook(response.data[1]);
                  } else {
                     setReviews(response.data);
                  }
               });
         }
      }
      setTargetReview({});
   };

   const onDeleteReviewClick = (review) => {
      axios
         .post("/api/library/review/delete", {
            book,
            review_id: review.review_id,
         })
         .then(() => setReviews(null));
   };

   useEffect(() => {
      const getReviews = async () => {
         const response = await axios.get(
            `/api/library/get-reviews/${book.book_id}`
         );
         setReviews(response.data);
      };
      if (reviews === null && book.book_id) {
         getReviews();
      }
   }, [book, reviews]);

   return (
      <div className={classes.reviews}>
         {isLoggedIn && (
            <ComposeReview
               content={targetReview.content || ""}
               onReviewContentChange={onReviewContentChange}
               onSubmitReviewClick={onSubmitReviewClick}
            />
         )}

         {reviews !== null &&
            reviews.length > 0 &&
            reviews.map((review) => (
               <Review
                  review={review}
                  setTargetReview={setTargetReview}
                  onDeleteReviewClick={onDeleteReviewClick}
                  key={uuidv4()}
               />
            ))}
      </div>
   );
}
