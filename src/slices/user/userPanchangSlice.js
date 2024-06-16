import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { showError } from "../messageSlice";

export const getPanchangs = createAsyncThunk(
  "usrPanchang/getArticles",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get('/panchangs');
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const navigateMonth = createAsyncThunk(
  "usrPanchang/navigateMonth",
  async ({id, date}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/panchangs/${id}/navigate`,{params: {date: date} },);
      return response.data;
    } catch (error) {
      dispatch(showError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const userPanchangSlice = createSlice({
  name: "usrPanchang",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getPanchangs.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(navigateMonth.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    });
  },
});

export default userPanchangSlice.reducer;