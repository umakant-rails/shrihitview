import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

export const getPanchangs = createAsyncThunk(
  "usrPanchang/getArticles",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get('/panchangs');
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
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
      dispatch({type: 'message/showError', payload: error.message});
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

// export const getPanchang = (id) => async dispatch => {
//   const response = await baseUrl.get(
//     `/admin/panchangs/${id}`, 
//   ).then(response => {
//     return response;
//   }).catch( error => error.response);

//   dispatch(dataDispatchToReducer(response, PANCHANG_SHOW));
// }

// export const createPanchang = (formValues) => async dispatch => {
//   const response = await baseUrl.post(
//     '/admin/panchangs', {panchang: formValues}
//   ).then(response => {
//     return response;
//   }).catch( error => error.response);

//   dispatch(dataDispatchToReducer(response, PANCHANG_CREATED));

// }

// export const updatePanchang = (id, form) => async dispatch => {
//   const response = await baseUrl.put(
//     `/admin/panchangs/${id}`, {panchang: form}
//   ).then(response => {
//     return response;
//   }).catch( error => error.response);

//   dispatch(dataDispatchToReducer(response, PANCHANG_UPDATED));
// }

// export const deletePanchang = (id) => async dispatch => {
//   const response = await baseUrl.delete(
//     `/admin/panchangs/${id}`
//   ).then(response => {
//     return response;
//   }).catch( error => error.response);

//   dispatch(dataDispatchToReducer(response, PANCHANG_DELETED));
// }