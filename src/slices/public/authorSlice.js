import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

export const getAuthors = createAsyncThunk(
  "pbAuthor/getAuthors",
  async (searchAttrs, {dispatch, rejectWithValue }) => {
    try {
      const arr = Object.keys(searchAttrs).map( key => {
        if(searchAttrs[key]){ 
          return `${key}=${searchAttrs[key]}` 
        }
      })
      const searchAttrStr = arr.join('&');
      const response = await baseUrl.get(`/pb/authors?${searchAttrStr}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getAuthorArticles = createAsyncThunk(
  "pbAuthor/getAuthorArticles",
  async ({name, page}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/authors/${name}?page=${page}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getSants = createAsyncThunk(
  "pbAuthor/getSants",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get('/pb/authors/sants');
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getSantBiography = createAsyncThunk(
  "pbAuthor/getSantBiography",
  async (name, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/authors/${name}/sant_biography`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {error: "", loading: false};

const authorSlice = createSlice({
  name: "pbAuthor",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getAuthors.fulfilled, (state, action) => {
      state.loading = false;
      state.authors = action.payload.authors;
      state.total_authors = action.payload.total_authors;
    })

    .addCase(getAuthorArticles.fulfilled, (state, action) => {
      state.author = action.payload.author;
      state.articles = action.payload.articles;
      state.total_articles = action.payload.total_articles;
    })

    .addCase(getSants.fulfilled, (state, action) => {
      state.sants = action.payload.sants;
    })

    .addCase(getSantBiography.fulfilled, (state, action) => {
      state.related_sants = action.payload.related_sants;
      state.sant = action.payload.sant;
    });
  }  
});

export default authorSlice.reducer;