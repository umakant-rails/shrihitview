import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../services/AxiosService";
import { getParamsStringFromHash } from "../../utils/utilityFunctions";

export const getStories = createAsyncThunk(
  "usrStory/getStories",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const paramsStr = getParamsStringFromHash(params);
      const response = await baseUrl.get(`/stories?${paramsStr}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const getStory = createAsyncThunk(
  "usrStory/getStory",
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/stories/${id}`);
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const createStory = createAsyncThunk(
  "usrStory/createStory",
  async (formValues, {dispatch, rejectWithValue }) => {
    try {
      formValues['title'] = formValues['title'].trim();
      const response = await baseUrl.post('/stories', {story: formValues});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const newStory = createAsyncThunk(
  "usrStory/newStory",
  async (params, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get('/stories/new');
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const editStory = createAsyncThunk(
  "usrStory/editStory", 
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.get(`/stories/${id}?action_type=edit`);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const updateStory = createAsyncThunk(
  "usrStory/updateStory", 
  async ({id, form}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.put(`/stories/${id}`, {story: form});
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStory = createAsyncThunk(
  "usrStory/deleteStory", 
  async ({id, origin_page}, {dispatch, rejectWithValue }) => {
    try {
      const response = await baseUrl.delete(`/stories/${id}?origin_page=${origin_page}`);
      dispatch({type: 'message/showMessage', payload: response});
      return response.data;
    } catch (error) {
      dispatch({type: 'message/showError', payload: error.message});
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {loading: false};

const userStorySlice = createSlice({
  name: "usrStory",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.
    addCase(getStories.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(getStory.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(createStory.pending, (state, action) => {
      state.loading = true;
    }).addCase(createStory.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(createStory.rejected, (state, action) => {
      state.loading = false;
    })

    .addCase(newStory.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(editStory.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
    })

    .addCase(updateStory.pending, (state, action) => {
      state.loading = true;
    }).addCase(updateStory.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(updateStory.rejected, (state, action) => {
      state.loading = false;
    })
    
    .addCase(deleteStory.pending, (state, action) => {
      state.loading = true;
    }).addCase(deleteStory.fulfilled, (state, action) => {
      for (const [key, value] of Object.entries(action.payload)) { state[key] = value; }
      state.loading = false;
    }).addCase(deleteStory.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userStorySlice.reducer;
