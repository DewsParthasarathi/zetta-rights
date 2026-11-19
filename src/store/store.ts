import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import movieReducer from "./movieSlice";
import offerReducer from "./offerSlice";

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
