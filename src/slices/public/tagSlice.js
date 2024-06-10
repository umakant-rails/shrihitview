import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { showError } from "../messageSlice";

export const getTags = createAsyncThunk(
  "pbTag/getTags",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/tags`);
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getTagArticles = createAsyncThunk(
  "pbTag/getTagArticles",
  async (name, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/tags/${name}`);
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {error: "", loading: false};

const tagSlice = createSlice({
  name: "pbTag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getTags.fulfilled, (state, action) => {
      state.loading = false;
      state.tags = action.payload.tags;
    })

    .addCase(getTagArticles.fulfilled, (state, action) => {
      state.tag = action.payload.tag;
      state.tags = action.payload.tags;
      state.articles = action.payload.articles;
    });
  }  
});

export default tagSlice.reducer;
