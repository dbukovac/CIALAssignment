import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
  searchResults: [],
  searchHistory: [],
  themeDark: true
};

axios.defaults.baseURL = 'http://localhost:4000'

export const searchByGET = createAsyncThunk('searchEngine/getSearchData', async (query, { dispatch }) => {
  dispatch(addedToHistory(query))
  const response = await axios.get(`/api/getSearchData?search=${query}`)
  return response.data
})

export const searchByPOST = createAsyncThunk('searchEngine/getSearchData', async (query, { dispatch }) => {
  dispatch(addedToHistory(query))
  const response = await axios.post('/api/getSearchData', { search: query })
  return response.data
})

export const getHitory = createAsyncThunk('searchEngine/getHistory', async () => {
  const response = await axios.get(`/api/getSearchHistory?timestamp=${Date.now()}`)
  return response.data
})

export const searchEngineSlice = createSlice({
  name: 'searchEngine',
  initialState,
  reducers: {
    addedToHistory: (state, action) => {
      state.searchHistory.unshift(action.payload);
    },
    changedTheme: (state) => {
      state.themeDark = !state.themeDark;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchByGET.fulfilled || searchByPOST.fulfilled, (state, action) => {
        state.searchResults = action.payload
      })
      .addCase(getHitory.fulfilled, (state, action) => {
        state.searchHistory = action.payload
      })
  },
});

export const { addedToHistory, changedTheme } = searchEngineSlice.actions;

export const selectResults = (state) => state.searchEngine.searchResults;
export const selectHistory = (state) => state.searchEngine.searchHistory;
export const themeDark = (state) => state.searchEngine.themeDark;

export default searchEngineSlice.reducer;
