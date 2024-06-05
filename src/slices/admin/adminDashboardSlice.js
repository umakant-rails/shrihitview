import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";


export const getDashboardData = createAsyncThunk(
  "adminDashboard/getDashboardData",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/admin/dashboards`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {};

const adminDashboard = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
    .addCase(getDashboardData.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    });
  }
});

export default adminDashboard.reducer;
