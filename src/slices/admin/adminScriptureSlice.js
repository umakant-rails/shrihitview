import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";

export const getScriptures = createAsyncThunk(
  "adminScripture/getScriptures",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params);
      const response = await baseUrl.get(`/admin/scriptures?${paramsStr}`);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getScripture = createAsyncThunk(
  "adminScripture/getScripture",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get( `/admin/scriptures/${id}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const newScripture = createAsyncThunk(
  "adminScripture/newScripture",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/admin/scriptures/new`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const createScripture = createAsyncThunk(
  "adminScripture/createScripture",
  async (form, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/admin/scriptures`, {scripture: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const editScripture = createAsyncThunk(
  "adminScripture/editScripture",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/admin/scriptures/${id}?action_type=edit`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updateScripture = createAsyncThunk(
  "adminScripture/updateScripture",
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(`/admin/scriptures/${id}`, {scripture: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteScripture = createAsyncThunk(
  "adminScripture/deleteScripture",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/admin/scriptures/${id}`);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getChapterArticles = createAsyncThunk(
  "adminScripture/getChapterArticles",
  async ({scripture_id, params}, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params);
      const response = await baseUrl.get(
        `/admin/scriptures/${scripture_id}/scripture_articles?${paramsStr}`
      );
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteScrArticle = createAsyncThunk(
  "adminScripture/deleteScrArticle",
  async ({scripture_id, article_id, params}, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params);
      const response = await baseUrl.delete(
        `/admin/scriptures/${scripture_id}/scripture_articles/${article_id}?${paramsStr}`
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

const adminScriptureSlice = createSlice({
  name: "adminScripture",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getScriptures.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(getScripture.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(newScripture.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(createScripture.pending, (state, action) => {
      state.loading = true;
    }).addCase(createScripture.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createScripture.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(editScripture.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(updateScripture.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateScripture.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateScripture.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deleteScripture.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteScripture.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteScripture.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(getChapterArticles.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
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

export default adminScriptureSlice.reducer;
