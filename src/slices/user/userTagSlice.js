import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";
import { showError, showMessage } from "../messageSlice";

export const getTags = createAsyncThunk(
  "usrTag/getTags",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params);
      const response = await baseUrl.get(`/tags?${paramsStr}`);
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const createTag = createAsyncThunk(
  "usrTag/createTag",
  async (form, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post('/tags', {tag: form});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const updateTag = createAsyncThunk(
  "usrTag/updateTag",
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(`/tags/${id}`, {tag: form});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTag = createAsyncThunk(
  "usrTag/deleteTag",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/tags/${id}`);
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const userTagSlice = createSlice({
  name: "usrTag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getTags.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(createTag.pending, (state, action) => {
      state.loading = true;
    }).addCase(createTag.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createTag.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updateTag.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateTag.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateTag.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deleteTag.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteTag.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteTag.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userTagSlice.reducer;