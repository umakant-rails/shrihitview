import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";

export const getAdminAuthors = createAsyncThunk(
  "adminAuthor/getAdminAuthors",
  async (searchAttrs, {dispatch, rejectWithValue }) => {
    try {
      const searchAttrsStr = getParamsStringFromHash(searchAttrs)
      const response = await baseUrl.get(`/admin/authors?${searchAttrsStr}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const approveToAuthor = createAsyncThunk(
  "adminAuthor/approveToAuthor",
  async ({id, searchAttrs}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/admin/authors/${id}/author_approved`, searchAttrs);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAdminAuthor = createAsyncThunk(
  "adminAuthor/deleteAdminAuthor",
  async ({id, searchAttrs}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/admin/authors/${id}`, {data: searchAttrs});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
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