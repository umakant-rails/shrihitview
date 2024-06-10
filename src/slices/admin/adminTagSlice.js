import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";
import { showError, showMessage } from "../messageSlice";

export const getAdminTags = createAsyncThunk(
  "adminTag/getAdminTags",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params)
      const response = await baseUrl.get(`/admin/tags?${paramsStr}`);
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const approveToTag = createAsyncThunk(
  "adminTag/approveToTag",
  async ({id, params}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/admin/tags/${id}/tag_approved`, params);
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const updateAdminTag = createAsyncThunk(
  "adminTag/updateAdminTag",
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(`/admin/tags/${id}`, {tag: form});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAdminTag = createAsyncThunk(
  "adminTag/deleteAdminTag",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/admin/tags/${id}`);
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const adminTagSlice = createSlice({
  name: "adminTag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getAdminTags.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(approveToTag.pending, (state, action) => {
      state.loading = true;
    }).addCase(approveToTag.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(approveToTag.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updateAdminTag.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateAdminTag.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateAdminTag.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deleteAdminTag.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteAdminTag.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteAdminTag.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default adminTagSlice.reducer;