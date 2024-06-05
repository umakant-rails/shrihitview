import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";

/* response send back to calling component */
export const newPanchangTithi = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/panchangs/${id}/panchang_tithis/new`,
  ).then(response => {
    return response;
  }).catch( error => error.response);

  return response;
}
// export const newPanchangTithi = createAsyncThunk(
//   "adminPanchangTithi/newPanchangTithi",
//   async (id, {dispatch, rejectWithValue }) => {
//     try {
//       const response = await baseUrl.get(`/admin/panchangs/${id}/panchang_tithis/new`);
//       console.log(response)
//       return response.data;
//     } catch (error) {
//       dispatch({type: 'message/showError', payload: error.message});
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const createPanchangTithi = createAsyncThunk(
  "adminPanchangTithi/createPanchangTithi",
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(`/admin/panchangs/${id}/panchang_tithis`, {panchang_tithi: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const navigateMonth = createAsyncThunk(
  "adminPanchangTithi/navigateMonth",
  async ({id, date}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/admin/panchangs/${id}/panchang_tithis/navigate`,{params: {date: date} });
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getEditingData = createAsyncThunk(
  "adminPanchangTithi/getEditingData",
  async ({id, date}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(
        `/admin/panchangs/${id}/panchang_tithis/get_editing_data`,{params: {date: date} }
      );
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updatePanchangTithi = createAsyncThunk(
  "adminPanchangTithi/updatePanchangTithi",
  async ({id, panchang_id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(
        `/admin/panchangs/${id}/panchang_tithis/${panchang_id}`, {panchang_tithi: form}
      );
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deletePanchangTithi = createAsyncThunk(
  "adminPanchangTithi/deletePanchangTithi",
  async ({panchang_id, panchang_tithi_id}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(
        `/admin/panchangs/${panchang_id}/panchang_tithis/${panchang_tithi_id}`
      );
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const adminPanchangTithiSlice = createSlice({
  name: "adminPanchangTithi",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    // .addCase(newPanchangTithi.fulfilled, (state, action) => {
    //   for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    // })

    .addCase(createPanchangTithi.pending, (state, action) => {
      state.loading = true;
    }).addCase(createPanchangTithi.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createPanchangTithi.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(navigateMonth.fulfilled, (state, action) => {
      console.log(action.payload)
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(getEditingData.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(updatePanchangTithi.pending, (state, action) => {
      state.loading = true;
    }).addCase(updatePanchangTithi.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updatePanchangTithi.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deletePanchangTithi.pending, (state, action) => {
      state.loading = true;
    }).addCase(deletePanchangTithi.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deletePanchangTithi.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default adminPanchangTithiSlice.reducer;