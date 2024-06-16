import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";
import { showError, showMessage } from "../messageSlice";

export const newArticle = createAsyncThunk(
  "usrArticle/newArticle",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get('/articles/new');
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const createArticle = createAsyncThunk(
  "usrArticle/createArticle",
  async (form, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post('/articles', {article: form});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const editArticle = createAsyncThunk(
  "usrArticle/editArticle",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/articles/${id}?action_type=edit`)
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "usrArticle/updateArticle",
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(`/articles/${id}`, {article: form});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "usrArticle/deleteArticle",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/articles/${id}`);
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const createTag = createAsyncThunk(
  "usrArticle/createTag",
  async (tag, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post('/tags', {tag: {name: tag}});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getArticles = createAsyncThunk(
  "usrArticle/getArticles",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get('/articles');
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getArticlesByPage = createAsyncThunk(
  "usrArticle/getArticlesByPage",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params);
      const response = await baseUrl.get(`/articles/pages/${params.page}?${paramsStr}`);
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getArticle = createAsyncThunk(
  "usrArticle/getArticle",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const usrArticleSlice = createSlice({
  name: "usrArticle",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(newArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(createArticle.pending, (state, action) => {
      state.loading = true;
    }).addCase(createArticle.fulfilled, (state, action) => {
      state.created_article = action.payload.article;
      state.loading = false;
    }).addCase(createArticle.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(editArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(updateArticle.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateArticle.fulfilled, (state, action) => {
      state.updated_article = action.payload.article;
      state.loading = false;
    }).addCase(updateArticle.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deleteArticle.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteArticle.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(createTag.pending, (state, action) => {
      state.loading = true;
    }).addCase(createTag.fulfilled, (state, action) => {
      state.tags = action.payload.tags;
      state.loading = false;
    }).addCase(createTag.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(getArticles.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(getArticlesByPage.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(getArticle.fulfilled, (state, action) => {
      state.updated_article = null;
      state.article = action.payload.article;
    });
  },
});

export default usrArticleSlice.reducer;