import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";

export const getAddArticlePageData = createAsyncThunk(
  "adminCompileScr/getAddArticlePageData",
  async (scripture_id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/admin/compiled_scriptures/${scripture_id}/add_articles_page`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getFilteredAritcles = createAsyncThunk(
  "adminCompileScr/getFilteredAritcles",
  async ({scripture_id, params}, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params)
      const response = await baseUrl.get(
        `/admin/compiled_scriptures/${scripture_id}/filter_articles?${paramsStr}`
      );
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const addArticleInCS = createAsyncThunk(
  "adminCompileScr/addArticleInCS",
  async ({scripture_id, article_id, params}, {dispatch, rejectWithValue }) => {
    try {
      params.cs_article = {
        article_id: article_id, scripture_id: scripture_id, chapter_id: params.chapter_id,
      }
      const response = await baseUrl.post(
        `/admin/compiled_scriptures/${scripture_id}/add_article`, params 
      );
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const removeArticleFromCS = createAsyncThunk(
  "adminCompileScr/removeArticleFromCS",
  async ({scripture_id, article_id, params}, {dispatch, rejectWithValue }) => {
    try {
      params.cs_article_id = article_id;
      const response = await baseUrl.post(
        `/admin/compiled_scriptures/${scripture_id}/remove_article`, params
      );
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const showCSScripture = createAsyncThunk(
  "adminCompileScr/showCSScripture",
  async ({scripture_id}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/admin/compiled_scriptures/${scripture_id}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getArticleForIndexing = createAsyncThunk(
  "adminCompileScr/getArticleForIndexing",
  async ({scripture_id, params}, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params)
      const response = await baseUrl.get(
        `/admin/compiled_scriptures/${scripture_id}/get_articles_for_indexing?${paramsStr}`
      );
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updateIndex = createAsyncThunk(
  "adminCompileScr/updateIndex",
  async ({scripture_id, params}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put( `/admin/compiled_scriptures/${scripture_id}/update_index`, params);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCSArticle = createAsyncThunk(
  "adminCompileScr/deleteCSArticle",
  async ({scripture_id, params}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/admin/compiled_scriptures/${scripture_id}/delete_article`, params);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const adminCompileScrSlice = createSlice({
  name: "adminCompileScr",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getAddArticlePageData.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(getFilteredAritcles.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(addArticleInCS.pending, (state, action) => {
      state.loading = true;
    }).addCase(addArticleInCS.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(addArticleInCS.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(removeArticleFromCS.pending, (state, action) => {
      state.loading = true;
    }).addCase(removeArticleFromCS.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(removeArticleFromCS.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(showCSScripture.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(getArticleForIndexing.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(updateIndex.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateIndex.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateIndex.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(deleteCSArticle.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteCSArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteCSArticle.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default adminCompileScrSlice.reducer;

