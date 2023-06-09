import { combineReducers } from '@reduxjs/toolkit';
import distanceReducer from './distanceSlice';

const rootReducer = combineReducers({
  distance: distanceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;