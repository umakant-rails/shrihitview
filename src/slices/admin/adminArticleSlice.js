import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";

export const getAdminArticles = createAsyncThunk(
  "adminArticle/getAdminArticles",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/admin/articles`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getArticlesByPage = createAsyncThunk(
  "adminArticle/getArticlesByPage",
  async (searchAttrs, {dispatch, rejectWithValue }) => {
    try {
      const searchAttrsStr = getParamsStringFromHash(searchAttrs);
      const response = await baseUrl.get(`/admin/articles/articles_by_page?${searchAttrsStr}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const approveArticle = createAsyncThunk(
  "adminArticle/approveArticle",
  async ({id, params}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/admin/articles/${id}/article_approved`, params);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);


export const deleteAdminArticle = createAsyncThunk(
  "adminArticle/deleteAdminArticle",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/admin/articles/${id}`);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const adminArticleSlice = createSlice({
  name: "adminArticle",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getAdminArticles.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(getArticlesByPage.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(approveArticle.pending, (state, action) => {
      state.loading = true;
    }).addCase(approveArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(approveArticle.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(deleteAdminArticle.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteAdminArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteAdminArticle.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default adminArticleSlice.reducer;