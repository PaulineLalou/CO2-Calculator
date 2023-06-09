import { configureStore } from "@reduxjs/toolkit";
import distanceReducer from "./reducers/distanceSlice";

const store = configureStore({
  reducer: {
    distance: distanceReducer,
  },
});

export default store;
