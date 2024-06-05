import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";

export const getStrota = createAsyncThunk(
  "adminStrotum/getStrota",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params);
      const response = await baseUrl.get(`/admin/strota?${paramsStr}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getStrotum = createAsyncThunk(
  "adminStrotum/getStrotum",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/admin/strota/${id}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const createStrotum = createAsyncThunk(
  "adminStrotum/createStrotum",
  async (form, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post('/admin/strota', {strotum: form});
      console.log(response);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const newStrotum = createAsyncThunk(
  "adminStrotum/newStrotum",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get('/admin/strota/new');
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const editStrotum = createAsyncThunk(
  "adminStrotum/editStrotum",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/admin/strota/${id}?action_type=edit`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updateStrotum = createAsyncThunk(
  "adminStrotum/updateStrotum",
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(`/admin/strota/${id}`, {strotum: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStrotum = createAsyncThunk(
  "adminStrotum/deleteStrotum",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/admin/strota/${id}`);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

/* strotum article functions start */
export const createStrotumArticle =(strotum_id, form) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/strota/${strotum_id}/strota_articles`, {strota_article: form}
  ).then(response => {
    dispatch({type: 'message/showMessage', payload: response});
    return response;
  }).catch( error => error.response);
  return response;
}

export const updateStrotumArticle = createAsyncThunk(
  "adminStrotum/updateStrotumArticle",
  async ({id, article_id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(
        `/admin/strota/${id}/strota_articles/${article_id}`, {strota_article: form}
      );
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updateAritcleIndex = createAsyncThunk(
  "adminStrotum/updateAritcleIndex",
  async ({id, article_id, new_index}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post(
        `/admin/strota/${id}/strota_articles/${article_id}/update_index`, {new_index: new_index}
      );
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStrotumArticle = createAsyncThunk(
  "adminStrotum/deleteStrotumArticle",
  async ({id, article_id}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(
        `/admin/strota/${id}/strota_articles/${article_id}`
      );
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);
/* strotum article funtions end */
const initialState = {loading: false};

const adminStrotumSlice = createSlice({
  name: "adminStrotum",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(getStrota.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(getStrotum.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(createStrotum.pending, (state, action) => {
      state.loading = true;
    }).addCase(createStrotum.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createStrotum.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(newStrotum.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(editStrotum.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(updateStrotum.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateStrotum.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateStrotum.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deleteStrotum.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteStrotum.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteStrotum.rejected, (state, action) => {
      state.loading = false;
    })
    /* strotum article async thunk binding from here */
    .addCase(updateStrotumArticle.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateStrotumArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateStrotumArticle.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(updateAritcleIndex.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateAritcleIndex.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateAritcleIndex.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(deleteStrotumArticle.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteStrotumArticle.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteStrotumArticle.rejected, (state, action) => {
      state.loading = false;
    })
    ;
  },
});

export default adminStrotumSlice.reducer;

