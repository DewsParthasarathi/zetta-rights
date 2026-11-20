import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import movieReducer from "./slices/movieSlice";
import offerReducer from "./slices/offerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    offers: offerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
