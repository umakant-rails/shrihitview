import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

export const getPanchangs = createAsyncThunk(
  "pbPanchang/getPanchangs",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/panchangs`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getPanchang = createAsyncThunk(
  "pbPanchang/getPanchang",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/panchangs/${id}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const navigateMonth = createAsyncThunk(
  "pbPanchang/navigateMonth",
  async ({id, date}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(
        `/pb/panchangs/${id}/navigate`,{params: {date: date} }
      );
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {error: "", loading: false};

const panchangSlice = createSlice({
  name: "pbPanchang",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getPanchangs.fulfilled, (state, action) => {
      state.loading = false;
      state.panchangs = action.payload.panchangs;
      state.total_panchangs = action.payload.total_panchangs;
    })

    .addCase(getPanchang.fulfilled, (state, action) => {
      state.panchang = action.payload.panchang;
    })

    .addCase(navigateMonth.fulfilled, (state, action) => {
      state.panchang = action.payload.panchang;
      state.tithis = action.payload.tithis;
    });
  }  
});

export default panchangSlice.reducer;
