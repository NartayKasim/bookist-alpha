import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   book: {},
};

export const submitRating = createAsyncThunk(
   "book/submitRating",
   async (ratingObj) => {
      const { book, rating } = ratingObj;
      const response = await axios.put("/api/book/rate", {
         book,
         rating,
      });
      return response.data;
   }
);

export const getAcquiredStats = createAsyncThunk(
   "book/getAcquiredStats",
   async (bookObj) => {
      const { title, author } = bookObj;
      const response = await axios.get("/api/book/get-bookcard", {
         title,
         author,
      });
      return response.data;
   }
);

const volumeInfoSlice = createSlice({
   name: "volumeInfoSlice",
   initialState,
   reducers: {
      loadAcquiredStats(state, action) {
         state.acquired_stats = action.payload;
         return state;
      },

      loadBook(state, action) {
         state = action.payload;
         return state;
      },

      clearBookState(state, action) {
         return initialState;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(submitRating.fulfilled, (state, action) => {
            state.book.users_rating = action.payload.rating;
            return state;
         })
         .addCase(getAcquiredStats.fulfilled, (state, action) => {
            state = action.payload;
         });
   },
});

export const { loadBook, clearBookState } = volumeInfoSlice.actions;
export default volumeInfoSlice.reducer;
