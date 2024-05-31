import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../services/AxiosService";

export const getHomePageData = createAsyncThunk(
  "auth/getHomePageData",
  async ( params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get('/pb/home');
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);


export const getFooterData = createAsyncThunk(
  "auth/getFooterData",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get('/pb/home/get_footer_data');
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);



const initialState = {};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.
    addCase(getHomePageData.fulfilled, (state, action) => {
      state.articles = action.payload.articles;
      state.authors = action.payload.authors;
      state.tags = action.payload.tags;
      state.contexts = action.payload.contexts;
      state.article_types = action.payload.article_types;
    })

    .addCase(getFooterData.fulfilled, (state, action) => {
      state.articles = action.payload.articles;
      state.authors = action.payload.authors;
      state.tags = action.payload.tags;
      state.contexts = action.payload.contexts;
      state.article_types = action.payload.article_types;
    })
  },
});

export default homeSlice.reducer;