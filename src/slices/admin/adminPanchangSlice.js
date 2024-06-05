import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";


export const getPanchangs = createAsyncThunk(
  "adminPanchang/getPanchangs",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/admin/panchangs`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getPanchang = createAsyncThunk(
  "adminPanchang/getPanchang",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/admin/panchangs/${id}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const createPanchang = createAsyncThunk(
  "adminPanchang/createPanchang",
  async(form, {dispatch, rejectWithValue}) => {
    try{
      const response = await baseUrl.post('/admin/panchangs', {panchang: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: "message/showError", payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updatePanchang = createAsyncThunk(
  "adminPanchang/updatePanchang",
  async({id, form}, {dispatch, rejectWithValue}) => {
    try{
      const response = await baseUrl.put(`/admin/panchangs/${id}`, {panchang: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: "message/showError", payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deletePanchang = createAsyncThunk(
  "adminPanchang/deletePanchang",
  async(id, {dispatch, rejectWithValue}) => {
    try{
      const response = await baseUrl.delete( `/admin/panchangs/${id}`);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: "message/showError", payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const adminPanchangSlice = createSlice({
  name: "adminPanchang",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getPanchangs.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(getPanchang.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(createPanchang.pending, (state, action) => {
      state.loading = true;
    }).addCase(createPanchang.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createPanchang.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updatePanchang.pending, (state, action) => {
      state.loading = true;
    }).addCase(updatePanchang.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updatePanchang.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deletePanchang.pending, (state, action) => {
      state.loading = true;
    }).addCase(deletePanchang.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deletePanchang.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default adminPanchangSlice.reducer;