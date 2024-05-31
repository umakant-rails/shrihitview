import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

export const getSuggestions = createAsyncThunk(
  "pbSuggestion/getSuggestions",
  async (page, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/suggestions?page=${page}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getSuggestion = createAsyncThunk(
  "pbSuggestion/getSuggestion",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/pb/suggestions/${id}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const createSuggestion = createAsyncThunk(
  "pbSuggestion/createSuggestion",
  async (form, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/pb/suggestions`, {suggestion: form});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {error: "", loading: false};

const suggestionSlice = createSlice({
  name: "pbSuggestion",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getSuggestions.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestions = action.payload.suggestions;
      state.total_suggestions = action.payload.total_suggestions;
      state.page = action.payload.page;
    })

    .addCase(getSuggestion.fulfilled, (state, action) => {
      state.suggestion = action.payload.suggestion;
    })
    
    .addCase(createSuggestion.pending, (state, action) => {
      state.loading = true;
    }).addCase(createSuggestion.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestion = action.payload.suggestion;
    }).addCase(createSuggestion.rejected, (state, action) => {
      state.loading = false;
    });
  }  
});

export default suggestionSlice.reducer;


// export const getSuggestions1 = (page) => async dispatch => {
//   const response = await baseUrl.get(
//     `/pb/suggestions?page=${page}`, 
//   ).then(response => {
//     return response;
//   }).catch( error => error.response);

//   dispatch(dataDispatchToReducer(response, PB_SUGGESTION_LIST));
// };

// export const getSuggestion1 = (id) => async(dispatch) => {
//   const response = await baseUrl.get(
//     `/pb/suggestions/${id}`, 
//   ).then(response => {
//     return response;
//   }).catch( error => error.response);

//   dispatch(dataDispatchToReducer(response, PB_SUGGESTION_SHOW));
// }

// export const createSuggestion1 = (form) => async(dispatch) => {
//   const response = await baseUrl.post(
//     `/pb/suggestions`, {suggestion: form}
//   ).then(response => {
//     return response;
//   }).catch( error => error.response);

//   dispatch(dataDispatchToReducer(response, PB_SUGGESTION_CREATED));
// }