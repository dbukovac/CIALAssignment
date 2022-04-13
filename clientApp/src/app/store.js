import { configureStore } from '@reduxjs/toolkit';
import searchEngineReducer from '../features/searchEngine/searchEngineSlice';

export const store = configureStore({
  reducer: {
    searchEngine: searchEngineReducer
  },
});
