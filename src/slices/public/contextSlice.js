import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

export const getContexts = createAsyncThunk(
  "pbContext/getContexts",
  async (page, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/contexts?page=${page}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getContextArticles = createAsyncThunk(
  "pbContext/getContextArticles",
  async ({name, page}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/contexts/${name}?page=${page}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {error: "", loading: false};

const contextSlice = createSlice({
  name: "pbContext",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getContexts.fulfilled, (state, action) => {
      state.loading = false;
      state.contexts = action.payload.contexts;
      state.total_contexts = action.payload.total_contexts;
    })

    .addCase(getContextArticles.fulfilled, (state, action) => {
      state.context = action.payload.cotext;
      state.articles = action.payload.articles;
      state.total_articles = action.payload.total_articles;
    });
  }  
});

export default contextSlice.reducer;