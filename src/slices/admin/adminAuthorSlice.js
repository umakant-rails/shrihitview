import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";
import { showError, showMessage } from "../messageSlice";

export const getAdminAuthors = createAsyncThunk(
  "adminAuthor/getAdminAuthors",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params)
      const response = await baseUrl.get(`/admin/authors?${paramsStr}`);
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const approveToAuthor = createAsyncThunk(
  "adminAuthor/approveToAuthor",
  async ({id, params}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/admin/authors/${id}/author_approved`, params);
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAdminAuthor = createAsyncThunk(
  "adminAuthor/deleteAdminAuthor",
  async ({id, params}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/admin/authors/${id}`, {data: params});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const adminAuthorSlice = createSlice({
  name: "adminAuthor",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getAdminAuthors.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(approveToAuthor.pending, (state, action) => {
      state.loading = true;
    }).addCase(approveToAuthor.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(approveToAuthor.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(deleteAdminAuthor.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteAdminAuthor.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteAdminAuthor.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default adminAuthorSlice.reducer;