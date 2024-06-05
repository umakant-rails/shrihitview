import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";

export const getAuthors = createAsyncThunk(
  "usrAuthor/getAuthors",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params);
      const response = await baseUrl.get(`/authors?${paramsStr}`)
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const createAuthor = createAsyncThunk(
  "usrAuthor/createAuthor",
  async (formValues, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post('/authors', {author: formValues});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const createSampradaya = createAsyncThunk(
  "usrAuthor/createSampradaya",
  async (sampradaya, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.post('/authors/sampradaya', {sampradaya: sampradaya});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const newAuthor = createAsyncThunk(
  "usrAuthor/newAuthor",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get('/authors/new');
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const editAuthor = createAsyncThunk(
  "usrAuthor/editAuthor",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/authors/${id}?action_type=edit`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updateAuthor = createAsyncThunk(
  "usrAuthor/updateAuthor",
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(`/authors/${id}`, {author: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAuthor = createAsyncThunk(
  "usrAuthor/deleteAuthor",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/authors/${id}`);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const userAuthorSlice = createSlice({
  name: "usrAuthor",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.
    addCase(getAuthors.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(createAuthor.pending, (state, action) => {
      state.loading = true;
    }).addCase(createAuthor.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createAuthor.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(createSampradaya.pending, (state, action) => {
      state.loading = true;
    }).addCase(createSampradaya.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createSampradaya.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(newAuthor.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(editAuthor.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(deleteAuthor.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteAuthor.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteAuthor.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userAuthorSlice.reducer;