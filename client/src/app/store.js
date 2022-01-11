import { configureStore } from "@reduxjs/toolkit";
import librarySlice from "../services/librarySlice.js";
import volumeInfoSlice from "../services/volumeInfoSlice.js";

import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
   key: "root",
   version: 1,
   storage: storageSession,
};

const rootReducer = combineReducers({
   volume_info: volumeInfoSlice,
   library: librarySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});

export let persistor = persistStore(store);
export default store;
