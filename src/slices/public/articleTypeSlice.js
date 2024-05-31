import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

export const getArticleTypes = createAsyncThunk(
  "pbArticleType/getArticleTypes",
  async (page, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/article_types?page=${page}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getArticleTypeArticles = createAsyncThunk(
  "pbArticleType/getArticleTypeArticles",
  async ({name, page}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/article_types/${name}?page=${page}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {error: "", loading: false};

const articleTypeSlice = createSlice({
  name: "pbArticleType",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getArticleTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.article_types = action.payload.article_types;
      state.total_article_types = action.payload.total_article_types;
    })

    .addCase(getArticleTypeArticles.fulfilled, (state, action) => {
      state.article_type = action.payload.article_type;
      state.articles = action.payload.articles;
      state.total_articles = action.payload.total_articles;
    });
  }  
});

export default articleTypeSlice.reducer;