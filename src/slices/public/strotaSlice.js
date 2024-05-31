import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

export const getStrota = createAsyncThunk(
  "pbStrotum/getStrota",
  async (page, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/strota?page=${page}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getStrotum = createAsyncThunk(
  "pbStrotum/getStrotum",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/strota/${id}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {error: "", loading: false};

const strotumSlice = createSlice({
  name: "pbStrotum",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getStrota.fulfilled, (state, action) => {
      state.loading = false;
      state.strota = action.payload.strota;
      state.total_strota = action.payload.total_strota;
      state.strota_types = action.payload.strota_types;
    })

    .addCase(getStrotum.fulfilled, (state, action) => {
      state.strota = action.payload.strota;
      state.strotum = action.payload.strotum;
      state.stories = action.payload.stories;
      state.strotum_articles = action.payload.strotum_articles;
    });
  }  
});

export default strotumSlice.reducer;
