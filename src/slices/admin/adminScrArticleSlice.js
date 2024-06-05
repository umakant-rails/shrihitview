import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

export const newScrArticle = createAsyncThunk(
  "adminScrArticle/newScrArticle",
  async (scripture_id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/admin/scriptures/${scripture_id}/scripture_articles/new`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getScrArticle = createAsyncThunk(
  "adminScrArticle/getScrArticle",
  async ({id, article_id}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get( `/admin/scriptures/${id}/scripture_articles/${article_id}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const createScrArticle = createAsyncThunk(
  "adminScrArticle/createScrArticle",
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(
        `/admin/scriptures/${id}/scripture_articles`, {scripture_article: form}
      );
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updateScrArticle = createAsyncThunk(
  "adminScrArticle/updateScrArticle",
  async ({id, article_id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(
        `/admin/scriptures/${id}/scripture_articles/${article_id}`, {scripture_article: form}
      );
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteScrArticle = createAsyncThunk(
  "adminScrArticle/deleteScrArticle",
  async ({scripture_id, article_id}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(
        `/admin/scriptures/${scripture_id}/scripture_articles/${article_id}`
      );
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const adminScrArticleSlice = createSlice({
  name: "adminScrArticle",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(newScrArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(getScrArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(createScrArticle.pending, (state, action) => {
      state.loading = true;
    }).addCase(createScrArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createScrArticle.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updateScrArticle.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateScrArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateScrArticle.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deleteScrArticle.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteScrArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteScrArticle.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default adminScrArticleSlice.reducer;