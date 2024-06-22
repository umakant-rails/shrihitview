import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";
import { showError, showMessage } from "../messageSlice";

export const getTypes = createAsyncThunk(
  "adminAType/getTypes",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params)
      const response = await baseUrl.get(`/admin/article_types?${paramsStr}`);
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const createType = createAsyncThunk(
  "adminAType/createType",
  async (formValues, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post('/admin/article_types', {article_type: formValues});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const updateType = createAsyncThunk(
  "adminAType/updateType",
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(`/admin/article_types/${id}`, {article_type: form});
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteType = createAsyncThunk(
  "adminAType/deleteType",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/admin/article_types/${id}`);
      dispatch(showMessage(response.data));
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const adminATypeSlice = createSlice({
  name: "adminAType",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getTypes.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(createType.pending, (state, action) => {
      state.loading = true;
    }).addCase(createType.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createType.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updateType.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateType.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateType.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deleteType.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteType.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteType.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default adminATypeSlice.reducer;