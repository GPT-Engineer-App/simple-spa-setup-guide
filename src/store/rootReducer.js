import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';

const rootReducer = combineReducers({
  posts: postsReducer,
});

export default rootReducer;