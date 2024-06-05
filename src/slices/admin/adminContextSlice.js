import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";

export const getContexts = createAsyncThunk(
  "adminContext/getContexts",
  async (searchAttrs, {dispatch, rejectWithValue }) => {
    try {
      const searchAttrsStr = getParamsStringFromHash(searchAttrs)
      const response = await baseUrl.get(`/admin/contexts?${searchAttrsStr}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const createContext = createAsyncThunk(
  "adminContext/createContext",
  async (formValues, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post('/admin/contexts', {context: formValues});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updateContext = createAsyncThunk(
  "adminContext/updateContext",
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(`/admin/contexts/${id}`, {context: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContext = createAsyncThunk(
  "adminContext/deleteContext",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/admin/contexts/${id}`);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const adminContextSlice = createSlice({
  name: "adminContext",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getContexts.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(createContext.pending, (state, action) => {
      state.loading = true;
    }).addCase(createContext.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createContext.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updateContext.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateContext.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateContext.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deleteContext.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteContext.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteContext.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default adminContextSlice.reducer;