import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   isLoggedIn: false,
   userBooks: [],
};

export const getUserBooks = createAsyncThunk(
   "library/getUserBooks",
   async () => {
      console.log("a");
      const response = await axios.get("/api/library/");
      return response.data;
   }
);

export const submitRating = createAsyncThunk(
   "library/submitRating",
   async (bookObj) => {
      const { book, rating } = bookObj;
      const response = await axios.post("/api/library/rate", { book, rating });
      return response.data;
   }
);

const librarySlice = createSlice({
   name: "library",
   initialState,
   reducers: {
      toggleIsLoggedIn(state, action) {
         state.isLoggedIn = !state.isLoggedIn;
         return state;
      },

      purgeNonUser(state, action) {
         if (action.payload === "id") {
            const newState = state.userBooks.filter(
               (book) => book && book.book_id
            );
            state.userBooks = [...newState];
         } else {
            if (!action.payload) {
               const newState = state.userBooks.filter(
                  (book) => book.booklists && book.booklists.length > 0 && book
               );
               state.userBooks = [...newState];
            }
         }
         return state;
      },

      updateUserBooks(state, action) {
         const targetBookId = action.payload.book_id;
         const newState = state.userBooks.filter(
            (book) => book.book_id !== targetBookId
         );
         state.userBooks = [...newState, action.payload];
         return state;
      },

      updateBooklistName(state, action) {
         if (action.payload.type === "delete") {
            for (let i = 0; i < state.userBooks.length; i++) {
               if (
                  state.userBooks[i].booklists.includes(action.payload.oldName)
               ) {
                  state.userBooks[i].booklists.splice(
                     state.userBooks[i].booklists.indexOf(
                        action.payload.oldName
                     )
                  );
               }
            }
         } else {
            for (let i = 0; i < state.userBooks.length; i++) {
               if (
                  state.userBooks[i].booklists.includes(action.payload.oldName)
               ) {
                  state.userBooks[i].booklists.splice(
                     state.userBooks[i].booklists.indexOf(
                        action.payload.oldName
                     )
                  );
                  state.userBooks[i].booklists.push(action.payload.newName);
               }
            }
         }
         return state;
      },

      clearBooklists(state, action) {
         state.userBooks = action.payload;
         return state;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getUserBooks.fulfilled, (state, action) => {
            const { payload } = action;
            state.userBooks = [...payload];
            return state;
         })
         .addCase(submitRating.fulfilled, (state, action) => {
            return state;
         });
   },
});

export const {
   toggleIsLoggedIn,
   clearBooklists,
   purgeNonUser,
   updateUserBooks,
   updateBooklistName,
} = librarySlice.actions;
export default librarySlice.reducer;
