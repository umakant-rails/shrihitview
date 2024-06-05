import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

export const getUserSuggestions = createAsyncThunk(
  "usrSuggestion/getUserSuggestions",
  async (page, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/suggestions?page=${page}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getUserSuggestion = createAsyncThunk(
  "usrSuggestion/getUserSuggestion",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/suggestions/${id}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const createUserSuggestion = createAsyncThunk(
  "usrSuggestion/createUserSuggestion",
  async (form, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/suggestions`, {suggestion: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserSuggestion = createAsyncThunk(
  "usrSuggestion/updateUserSuggestion",
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(`/suggestions/${id}`, {suggestion: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserSuggestion = createAsyncThunk(
  "usrSuggestion/deleteUserSuggestion",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/suggestions/${id}`);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const userSuggestionSlice = createSlice({
  name: "usrSuggestion",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.
    addCase(getUserSuggestions.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(getUserSuggestion.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(createUserSuggestion.pending, (state, action) => {
      state.loading = true;
    }).addCase(createUserSuggestion.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createUserSuggestion.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(updateUserSuggestion.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateUserSuggestion.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateUserSuggestion.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deleteUserSuggestion.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteUserSuggestion.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteUserSuggestion.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSuggestionSlice.reducer;
