import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";

export const getChapters = createAsyncThunk(
  "adminScrChapter/getChapters",
  async ({id, params}, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params);
      const response = await baseUrl.get(`/admin/scriptures/${id}/chapters?${paramsStr}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const createChapter = createAsyncThunk(
  "adminScrChapter/createChapter",
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/admin/scriptures/${id}/chapters`, {chapter: form} );
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updateChapter = createAsyncThunk(
  "adminScrChapter/updateChapter",
  async ({id, chapter_id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(
        `/admin/scriptures/${id}/chapters/${chapter_id}`, {chapter: form} 
       );
       dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteChapter = createAsyncThunk(
  "adminScrChapter/deleteChapter",
  async ({id, chapter_id}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/admin/scriptures/${id}/chapters/${chapter_id}`);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const adminScrChapterSlice = createSlice({
  name: "adminScrChapter",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getChapters.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(createChapter.pending, (state, action) => {
      state.loading = true;
    }).addCase(createChapter.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createChapter.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updateChapter.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateChapter.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateChapter.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deleteChapter.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteChapter.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteChapter.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default adminScrChapterSlice.reducer;