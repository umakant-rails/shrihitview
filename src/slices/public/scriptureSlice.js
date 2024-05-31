import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

export const getScriptures = createAsyncThunk(
  "pbScripture/getScriptures",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/scriptures`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getScrArticles = createAsyncThunk(
  "pbScripture/getScrArticles",
  async (name, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/scriptures/${name}`,);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {error: "", loading: false};

const scriptureSlice = createSlice({
  name: "pbScripture",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getScriptures.fulfilled, (state, action) => {
      state.loading = false;
      state.scriptures = action.payload.scriptures;
    })

    .addCase(getScrArticles.fulfilled, (state, action) => {
      state.scripture = action.payload.scripture;
      state.articles = action.payload.articles;
    });
  }  
});

export default scriptureSlice.reducer;
